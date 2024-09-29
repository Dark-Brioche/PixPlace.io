/*
 * Admintools
 */

import React, { useState, useEffect } from 'react';
import { t } from 'ttag';

import { shardOrigin } from '../store/actions/fetch';

import { Newspost } from "./windows/News"


async function postnews(
      post,
      callback,
) {
      const data = new FormData();
      data.append('postobj', post);

      const resp = await fetch(`${shardOrigin}/api/modtools`, {
            credentials: 'include',
            method: 'POST',
            body: data,
      });

      if (resp.ok) {
            callback(await resp.json());
      } else {
            callback(await resp.text());
      }
}

function Newstools() {
      const [txtval, setTxtval] = useState('');
      const [resp, setResp] = useState(null);
      const [submitting, setSubmitting] = useState(false);
      const [previewcode, setpreviewcode] = useState("")

      return (
            <div className="content">
                  {resp && (
                        <div className="respbox">
                              {resp.split('\n').map((line) => (
                                    <p key={line.slice(0, 3)}>
                                          {line}
                                    </p>
                              ))}
                              <span
                                    role="button"
                                    tabIndex={-1}
                                    className="modallink"
                                    onClick={() => setResp(null)}
                              >
                                    {t`Close`}
                              </span>
                        </div>
                  )}
                  <div>
                        <br />
                        <h3>{t`News post`}</h3>
                        <p>
                              {t`Write News post (in html)`}
                              <br />
                              {t`markdown to html converter : `}<a href='https://markdowntohtml.com/' target="_blank"> {`https://markdowntohtml.com`} </a>
                        </p>
                        <br />
                        <textarea
                              rows="10"
                              cols="17"
                              value={txtval}
                              onChange={(e) => setTxtval(e.target.value)}
                        /><br />
                        <button
                              type="button"
                              onClick={() => {
                                    setpreviewcode(txtval);
                              }}
                        >
                              {t`Preview`}
                        </button>
                        <br />
                        <div className="modaldivider" />
                        <h3>{t`Preview`}</h3>
                        <p>
                              {t`Preview news post`}
                        </p>
                        <Newspost post={{ text: previewcode }} />
                        <br />
                        <div className="modaldivider" />
                        <br />
                  </div>
                  <button
                        type="button"
                        onClick={() => {
                              if (submitting) {
                                    return;
                              }
                              setSubmitting(true);
                              postnews(
                                    txtval,
                                    (ret) => {
                                          setResp(ret);
                                          setSubmitting(false);
                                    }

                              );
                        }}
                  >
                        {(submitting) ? '...' : t`Send and restart`}
                  </button>
            </div>
      );
}

export default React.memo(Newstools);
