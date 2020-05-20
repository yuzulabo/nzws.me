import React from 'react';
import PropTypes from 'prop-types';

import * as matter from 'gray-matter';
import unified from 'unified';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

import styled from 'styled-components';
import media from 'styled-media-query';
import { lighten, darken } from 'polished';

import Link from 'next/link';
import Head from 'next/head';

import { ChevronUp } from 'react-feather';
import { Twitter } from '@icons-pack/react-simple-icons';

import generateSummary from '../../lib/summary';
import ExternalLink from '../../components/external-link';

const processor = unified()
  .use(parse)
  .use(remark2rehype, {
    allowDangerousHtml: true
  })
  .use(html, {
    allowDangerousHtml: true
  });

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const Container = styled.div`
  ${media.greaterThan('medium')`
    width: 700px;
    margin: 20px auto;
  `};

  ${media.lessThan('medium')`
    margin: 10px;
  `};

  p {
    padding-top: 4px;
    padding-bottom: 10px;
  }

  ul,
  img {
    padding: 10px 0;
  }

  img,
  iframe {
    margin: 0 auto;
  }

  img,
  iframe,
  twitter-widget {
    display: block;
    max-width: 100%;
  }

  iframe,
  twitter-widget {
    margin: 10px auto;
  }

  main {
    font-weight: 300;
    font-size: 1.2rem;
  }
`;

const Nav = styled.div`
  margin-bottom: 10px;

  a {
    color: ${({ theme: { text } }) => text};
  }

  &,
  b {
    font-size: 1.3rem;
  }
`;

const Pan = styled.span`
  padding: 0 4px;
  font-size: 1.5rem;
  color: ${({ theme: { text } }) => darken(0.25, text)};
`;

const Header = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid
    ${({ theme: { background } }) => lighten(0.2, background)};
`;

const Muted = styled.div`
  color: ${({ theme: { text } }) => darken(0.5, text)};
`;

const Tags = styled.div`
  margin-top: 5px;

  > span {
    margin-right: 5px;

    > span {
      margin-left: 2px;
      font-size: 16px;
    }
  }
`;

const Footer = styled.footer`
  border-top: 1px solid
    ${({ theme: { background } }) => lighten(0.2, background)};
  margin-top: 10px;
  padding-top: 10px;

  a {
    margin-right: 15px;
  }
`;

const BlogPost = ({ data }) => {
  return (
    <Container>
      <Head>
        <meta name="description" content={data.summary} />
        {data.tags && (
          <meta
            name="keywords"
            content={[...data.tags, 'ねじわさ', 'nzws'].join(', ')}
          />
        )}
      </Head>

      <Nav>
        <Link href="/">
          <a>nzws.me</a>
        </Link>
        <Pan>/</Pan>
        <Link href="/blog">
          <a>blog</a>
        </Link>
        <Pan>/</Pan>
        <Link href="/blog/[id]" as={`/blog/${data.id}`}>
          <a>
            <b>{data.id}</b>
          </a>
        </Link>
      </Nav>

      <Header>
        <h1>{data.title}</h1>
        <Muted>
          {new Date(data.date).toLocaleDateString(undefined, dateOptions)}
        </Muted>
        {data.tags && (
          <Tags>
            {data.tags.map(tag => (
              <span key={tag}>
                #<span>{tag}</span>
              </span>
            ))}
          </Tags>
        )}
      </Header>

      <main
        dangerouslySetInnerHTML={{
          __html: processor.processSync(data.body).contents
        }}
      />

      <Footer>
        <a href="#">
          <ChevronUp className="icon" />
        </a>
        <ExternalLink
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            data.title
          )}&url=${encodeURIComponent(
            'https://nzws.me/blog/' + data.id
          )}&via=nzws_me&related=nzws_me`}
        >
          <Twitter className="icon" size={18} /> ツイート
        </ExternalLink>
      </Footer>
    </Container>
  );
};

BlogPost.propTypes = {
  data: PropTypes.object
};

BlogPost.getInitialProps = ({ res, query: { id } }) => {
  try {
    const { default: md } = require(`../../blog-data/posts/${id}.md`);
    const m = matter(md);
    const summary = generateSummary(m.content);

    return {
      title: `${m.data.title} - Blog`,
      data: {
        ...m.data,
        body: m.content,
        id,
        summary
      }
    };
  } catch (e) {
    res.statusCode = 404;
    res.end('Not found');
  }
};

export default BlogPost;