import cx from 'classnames';

export const TitleItem = ({ children, dark, capitalize, classes }) => (
  <h2 className={
    cx(
      classes, 
      `
        font-heading
        mb-4
        font-bold
        text-3xl
        ${capitalize ? 'capitalize' : ''}
        ${dark ? 'text-white' : 'text-main-900'}

        sm:text-4xl

        [&_strong]:text-[#2b74f3]
        [&_strong]:bg-clip-text
        [&_strong]:[-webkit-text-fill-color:transparent]
        [&_strong]:bg-gradient-to-l
        [&_strong]:from-[#3482ef]
        [&_strong]:to-[#1f62f2]
      `
    )}>{children}</h2>
);
