
/**
 *
 */

import React from 'react';
import Posts from '../../News.json';

export function Newspost({ post }) {
      if (!post) {
            return (
                  <div className="container">
                        <h6 style={{
                              margin: 2,
                              textAlign: "left"
                        }}>{new Date().toString()}</h6>
                  </div>
            )
      }

      return (
            <div className="container">
                  <div dangerouslySetInnerHTML={{ __html: post["text"] }}></div>
                  <h6 style={{
                        margin: 2,
                        textAlign: "left"
                  }}>{post["date"] ? new Date(post["date"]).toString() : new Date().toString()}</h6>
            </div>
      )
}
const Newspop = () => {

      return (
            <div className="content">
                  {
                        Object.keys(Posts).map((keyName) => (
                              <Newspost post={Posts[keyName]} />
                        ))
                  }
            </div>
      );
};

export default React.memo(Newspop);