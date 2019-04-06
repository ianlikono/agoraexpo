import React from 'react';

export interface NotFoundProps {
  props: any;
}

const NotFound: React.SFC<NotFoundProps> = () => {
  return (
    <div>
      <h4>Page Not Found</h4>
    </div>
  );
};

export default NotFound;
