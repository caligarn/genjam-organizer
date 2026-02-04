import type { Participant, DurationCommitment } from './teamBuilder';

const VALID_DURATIONS: DurationCommitment[] = ['FULL', 'MOST', 'HALF', 'SHORT', 'UNSURE'];

export interface CSVParseResult {
  participants: Participant[];
  errors: string[];
  rawHeaders: string[];
  rowCount: number;
}

/**
 * Parse a CSV row respecting quoted fields.
 * Handles: commas inside quotes, escaped quotes (""), trailing commas.
 */
function parseCSVRow(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        current += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === ',') {
        fields.push(current.trim());
        current = '';
        i++;
      } else {
        current += ch;
        i++;
      }
    }
  }

  fields.push(current.trim());
  return fields;
}

function normalizeHeader(header: string): string {
  return header
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

function parseBoolean(value: string): boolean {
  const v = value.trim().toLowerCase();
  return v === 'true' || v === 'yes' || v === '1';
}

function parseDuration(value: string): DurationCommitment {
  const v = value.trim().toUpperCase() as DurationCommitment;
  if (VALID_DURATIONS.includes(v)) return v;
  return 'UNSURE';
}

function parseSkills(value: string): string[] {
  if (!value.trim()) return [];
  return value
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseCSV(csvText: string): CSVParseResult {
  const lines = csvText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    return { participants: [], errors: ['CSV must have a header row and at least one data row'], rawHeaders: [], rowCount: 0 };
  }

  const rawHeaders = parseCSVRow(lines[0]);
  const headers = rawHeaders.map(normalizeHeader);

  // Map column indices
  const col = (name: string) => headers.indexOf(name);
  const nameIdx = col('name');
  const emailIdx = col('email');
  const ideaIdx = col('idea_blurb');
  const aiScoreIdx = col('ai_capability_score');
  const editorIdx = col('is_editor');
  const skillsIdx = col('traditional_skills');
  const durationIdx = col('duration_commitment');

  const missingCols: string[] = [];
  if (nameIdx === -1) missingCols.push('name');
  if (emailIdx === -1) missingCols.push('email');
  if (aiScoreIdx === -1) missingCols.push('ai_capability_score');
  if (editorIdx === -1) missingCols.push('is_editor');
  if (durationIdx === -1) missingCols.push('duration_commitment');

  if (missingCols.length > 0) {
    return {
      participants: [],
      errors: [`Missing required columns: ${missingCols.join(', ')}`],
      rawHeaders,
      rowCount: lines.length - 1,
    };
  }

  const participants: Participant[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVRow(lines[i]);
    const rowNum = i + 1;

    try {
      const name = fields[nameIdx] ?? '';
      const email = fields[emailIdx] ?? '';

      if (!name || !email) {
        errors.push(`Row ${rowNum}: Missing name or email`);
        continue;
      }

      const rawScore = parseInt(fields[aiScoreIdx] ?? '0', 10);
      const aiCapabilityScore = Math.max(0, Math.min(5, isNaN(rawScore) ? 0 : rawScore));

      const participant: Participant = {
        name,
        email: email.toLowerCase().trim(),
        ideaBlurb: ideaIdx !== -1 ? (fields[ideaIdx] ?? '') : '',
        aiCapabilityScore,
        isEditor: parseBoolean(fields[editorIdx] ?? 'false'),
        traditionalSkills: skillsIdx !== -1 ? parseSkills(fields[skillsIdx] ?? '') : [],
        durationCommitment: parseDuration(fields[durationIdx] ?? 'UNSURE'),
      };

      participants.push(participant);
    } catch {
      errors.push(`Row ${rowNum}: Failed to parse`);
    }
  }

  return { participants, errors, rawHeaders, rowCount: lines.length - 1 };
}
