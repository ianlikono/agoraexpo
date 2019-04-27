/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable prefer-destructuring */

import Document, { Head, Main, NextScript } from 'next/document';
import PropTypes from 'prop-types';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    let pageContext;
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired,
      };

      return WrappedComponent;
    });

    let css;
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString();
    }
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
        ctx.renderPage = () => originalRenderPage({
            enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
          })

        const initialProps = await Document.getInitialProps(ctx)
        return {
          ...initialProps,
          ...page,
          pageContext,
          styles: (
            <React.Fragment>
              <style
                id="jss-server-side"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: css }}
              />
              {initialProps.styles}{sheet.getStyleElement()}{flush() || null}
            </React.Fragment>
          )
        }
      } finally {
        sheet.seal()
      }
  }
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext ? pageContext.theme.palette.primary.main : null}
          />
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,300i,400,500" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
