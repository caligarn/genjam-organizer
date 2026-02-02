import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  RegistrationPage,
  SkillsSurveyPage,
  IcebreakerPage,
  IdeasSubmissionPage,
  WorkflowPage,
  CheatSheetPage,
  ExamplesPage,
  StoryboardPage,
  SubmitPage,
  VotingPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/skills-survey" element={<SkillsSurveyPage />} />
        <Route path="/icebreaker" element={<IcebreakerPage />} />
        <Route path="/ideas-submission" element={<IdeasSubmissionPage />} />
        <Route path="/workflow" element={<WorkflowPage />} />
        <Route path="/cheatsheet" element={<CheatSheetPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="/storyboard" element={<StoryboardPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/voting" element={<VotingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
