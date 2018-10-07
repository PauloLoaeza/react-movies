import React from 'react';

const Like = ({ liked, onLike }) => {
  let classes = 'fa fa-heart text-danger';
  if (!liked) classes = 'fa fa-heart-o';

  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={onLike}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Like;
