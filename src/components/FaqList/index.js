import React, { Fragment, useCallback } from 'react';

import { Collapse } from '../Collapse';
import { Loading }  from '../Loading';
import './index.css';

export function FaqList({ className, array, loading, error, search }) {
  const highLight = useCallback((str) => {
    return highlightText(search, str);
  }, [search]);

  const highlightText = (filter, str) => {
    if (!filter) return str;

    const regExp = new RegExp(filter, 'gi');
    const matchValue = str.match(regExp);

    if (matchValue) {
      return str.split(regExp).map((s, index, array) => {
        if (index < array.length - 1) {
          const search = matchValue.shift();
          return <Fragment key={s.slice(0, 3).trim() + index}>{s}<span className={"faqList_items__searchedText"}>{search}</span></Fragment>
        }
        return s;
      });
    }
    return str;
  };

  return (
    <div className={`faqList ${className || ''}`}>
      <div className={"faqList_title"}>
        <span>FAQ</span>
      </div>
      <div className={"faqList_items"}>
        {
          loading ? (
            <Loading />
          ) : (
            array.map((question, index) => (
              <Collapse
                className={"faqList_items__collapse"}
                expanded={index === 0}
                key={question.value}
                title={<span>{search ? highLight(question.title) : question.title}</span>}
                description={<span>{search ? highLight(question.description) : question.description}</span>}
              />
            ))
          )
        }
      </div>
    </div>
  )
}
