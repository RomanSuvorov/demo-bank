import React, { useEffect, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Loading } from '../../components';
import { Input } from '../../components';
import { Collapse } from '../../components';
import { loadFaqData } from '../../store/faq/actions';
import { SearchIcon } from '../../assets/icons';
import FaqTypes from '../../store/faq/types';
import './FaqScreen.css';

const Tags = ({ className, tags, chosen, fixed = false, onClick = () => {} }) => {
  const { t } = useTranslation('translation');

  return (
    <Collapse
      className={className}
      title={<span>{t('faq.metaBlockTitle')}</span>}
      description={
        tags.map(tag => {
          const active = chosen.includes(tag);

          return (
            <span
              className={`faqScreen_metaTags__item ${active ? 'active' : ''}`}
              key={tag}
              onClick={() => onClick(tag)}
            >
              {tag}
            </span>
          );
        })
      }
      isFixed={fixed}
    />
  );
};

function FaqScreen() {
  const {
    loading,
    error,
    searchText,
    searchedFaqArray,
    faqArray,
    metaTags,
    chosenMetaTags,
  } = useSelector(state => state.faq);
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');
  const mapList = searchText ? searchedFaqArray : faqArray;
  const highLight = useCallback((str) => {
    return highlightText(searchText, str);
  }, [searchText]);

  useEffect(() => {
    dispatch(loadFaqData());
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: FaqTypes.SEARCH_BY_TEXT, payload: searchText });
  };

  const handleSearchChange = value => {
    dispatch({ type: FaqTypes.SEARCH_BY_TEXT, payload: value });
  };

  const highlightText = (filter, str) => {
    if (!filter) return str;

    const regExp = new RegExp(filter, 'gi');
    const matchValue = str.match(regExp);

    if (matchValue) {
      return str.split(regExp).map((s, index, array) => {
        if (index < array.length - 1) {
          const search = matchValue.shift();
          return <Fragment key={s.slice(0, 3).trim() + index}>{s}<span className={"faqScreen_list__searchedText"}>{search}</span></Fragment>
        }
        return s;
      });
    }
    return str;
  };

  const handleToggleMetaTag = (tag) => dispatch({ type: FaqTypes.CHANGE_CHOSEN_TAGS, payload: tag });

  return (
    <div className={"faqScreen"}>
      {
        loading ? (
          <Loading text={"Loading data..."} />
        ) : (
          <Fragment>
            <div className={"faqScreen_wrapper"}>
              <form
                className={"faqScreen_form"}
                onSubmit={handleSearchSubmit}
              >
                <Input
                  className={"faqScreen_form__input"}
                  name={"search"}
                  value={searchText}
                  placeholder={t('faq.searchPlaceholder')}
                  Icon={SearchIcon}
                  iconHandler={handleSearchSubmit}
                  onChange={handleSearchChange}
                />
              </form>

              {/* --- MOBILE --- */}
              <Tags
                className={"faqScreen_metaTags mobile"}
                tags={metaTags}
                chosen={chosenMetaTags}
                onClick={(tag) => handleToggleMetaTag(tag)}
              />

              <div className={"faqScreen_list"}>
                <div className={"faqScreen_list__title"}>
                  <span>FAQ</span>
                </div>
                <div className={"faqScreen_list__items"}>
                  {
                    mapList
                      .filter(q => {
                        if (chosenMetaTags.length <= 0) {
                          return q;
                        }

                        const exist = chosenMetaTags.every(t => q.metaTags.includes(t));
                        if (exist) return q;
                      })
                      .map((question, index) => (
                        <Collapse
                          className={"faqScreen_list__collapse"}
                          expanded={index === 0}
                          key={question.value}
                          title={<span>{highLight(question.title)}</span>}
                          description={<span>{highLight(question.description)}</span>}
                        />
                    ))
                  }
                </div>
              </div>
            </div>

            {/* --- TABLET AND DESKTOP --- */}
            <Tags
              className={"faqScreen_metaTags desktop"}
              tags={metaTags}
              chosen={chosenMetaTags}
              fixed={true}
              onClick={(tag) => handleToggleMetaTag(tag)}
            />
          </Fragment>
        )
      }
    </div>
  );
}

export { FaqScreen };
