import { Question, Wrapper } from './ui';

const PollQuestion = ({ children, question, multiple = false, showWow = true }) => (
  <Wrapper multiple={multiple}>
    <Question>
      {question}
    </Question>
    {children}
  </Wrapper>
)

export default PollQuestion;
