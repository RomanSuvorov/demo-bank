import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Loading }  from '../../components/Loading';
import { Input } from '../../components/Input';
import { Collapse } from '../../components/Collapse';
import { FaqList } from '../../components/FaqList';
import { loadFaqData } from '../../store/faq/actions';
import { SearchIcon } from '../../assets/icons';
import FaqTypes from '../../store/faq/types';
import './index.css';

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

export function FaqScreen() {
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
  let mapList = searchText ? searchedFaqArray : faqArray;
  mapList = mapList.filter(q => {
    if (chosenMetaTags.length <= 0) return q;
    const exist = chosenMetaTags.every(t => q.metaTags.includes(t));
    if (exist) return q;
  });


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

  const handleToggleMetaTag = (tag) => dispatch({ type: FaqTypes.CHANGE_CHOSEN_TAGS, payload: tag });

  return (
    <div className={"faqScreen"}>
      {
        loading ? (
          <Loading text={"Loading data"} withDots />
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

              <FaqList
                className={"faqScreen_list"}
                array={mapList}
                search={searchText}
              />
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
