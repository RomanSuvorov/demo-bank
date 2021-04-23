import React, { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Collapse } from '../Collapse';
import { Loading }  from '../Loading';
import { ErrorBlock } from '../ErrorBlock';
import './index.css';

export function FaqList({ className, page = false, expandedIndex = undefined }) {
  const loading = useSelector(state => state.faq.loading);
  const error = useSelector(state => state.faq.error);
  const searchText = useSelector(state => state.faq.searchText);
  const searchedFaqArray = useSelector(state => state.faq.searchedFaqArray);
  const faqArray = useSelector(state => state.faq.faqArray);
  const chosenMetaTags = useSelector(state => state.faq.chosenMetaTags);

  let mapList = searchText ? searchedFaqArray : faqArray;
  mapList = mapList.filter(q => {
    if (chosenMetaTags.length <= 0) return q;
    const exist = chosenMetaTags.every(t => q.metaTags.includes(t));
    if (exist) return q;
  });

  const highLight = useCallback((str) => {
    return highlightText(searchText, str);
  }, [searchText]);

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

  const getList = () => {
    if (error) {
      return (
        <ErrorBlock error={error} />
      );
    }

    if (loading) {
      return (
        <Loading text={"Load FAQ Data"} withDots={true} block={true} />
      );
    }

    return (
      <div className={"faqList_items__infiniteScrollBox"}>
        {
          mapList.map((question, index) => (
            <Collapse
              className={"faqList_items__collapse"}
              expanded={index === expandedIndex}
              key={question.value}
              title={<span>{searchText ? highLight(question.title) : question.title}</span>}
              description={<span>{searchText ? highLight(question.description) : question.description}</span>}
            />
          ))
        }
      </div>
    );
  };

  return (
    <div className={`faqList ${className || ''}`}>
      <div className={"faqList_title"}>
        <span>FAQ</span>
      </div>
      <div className={`faqList_items ${page ? 'page' : ''}`}>
        {getList()}
      </div>
    </div>
  )
}
