import AuthorMediumBox from '../AuthorMediumBox';

const PodcastAuthorsList = ({ authors }) => (
  <div className="hidden lg:block">
    {authors.map(({ fields: a }) => (
      <AuthorMediumBox
        name={a.name}
        description={a.description}
        key={a.name as unknown as string}
        linkedIn={a.linkedIn}
        email={a.email}
        facebook={a.facebook}
        twitter={a.twitter}
      />
    ))}
  </div>
)

export default PodcastAuthorsList;
