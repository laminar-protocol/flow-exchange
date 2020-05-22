import React from 'react';
import { Helmet } from 'react-helmet';

type WebsiteTitleProps = React.ComponentProps<typeof Helmet>;

const WebsiteTitle: React.FC<WebsiteTitleProps & { value?: string }> = ({ value, ...other }) => {
  return (
    <Helmet defaultTitle="Flow Exchange by Laminar" titleTemplate="%s | Flow Exchange by Laminar" {...other}>
      {value && <title>{value}</title>}
    </Helmet>
  );
};

export default WebsiteTitle;
