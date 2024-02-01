import { Message, Wrapper } from './ui';

const Loader = ({ revert = false, msg }) => (
  <Wrapper>
    <div className={`loader ${revert ? 'revert' : ''}`}></div>
    <Message revert={revert}>{msg}</Message>
  </Wrapper>
)

export default Loader;
