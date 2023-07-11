import './PageNotFound.styles.scss';

import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404 Error</span>
        <span className="smallText">Page Not Found!</span>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
