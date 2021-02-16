import React from 'react';
import { useTranslation } from 'react-i18next';
import useClipboard from "react-use-clipboard";

import { MailIcon, PhoneIcon, CopyIcon } from '../../assets/icons';
import './Contacts.css';

function Contacts() {
  const { t } = useTranslation('translation');
  const phone = '+380685241417';
  const mail = 'support@100btc.kiev.ua';
  const [isPhoneCopied, setPhoneCopied] = useClipboard(phone, { successDuration: 3000 });
  const [isMailCopied, setMailCopied] = useClipboard(mail, { successDuration: 3000 });

  const handleCopy = (e, copyField) => {
    if (e && e.target) e.preventDefault();

    if (copyField === 'phone') {
      setPhoneCopied();
    } else {
      setMailCopied();
    }
  };

  return (
    <div className={"contacts"} onClick={e => e.stopPropagation()}>
      <div className={"contacts_background"} />
      <div className={"contacts_content"}>
        <div className={"contacts_content__title"}>
          <span>{t('contacts.title')}</span>
        </div>

        <div className={"contacts_content_items"}>
          <a href={`mailto:${mail}`} className={"contacts_content__item"}>
            <div className={"contacts_content__iconBox"}>
              <MailIcon className={"contacts_content__item--icon"} />
            </div>
            <div className={"contacts_content__contentBox"}>
              <span className={"contacts_content__item--text"}>{mail}</span>
            </div>
            <div
              className={"contacts_content__copyBox"}
              onClick={e => handleCopy(e, 'mail')}
            >
              <CopyIcon className={`contacts_content__item--copy ${isMailCopied ? 'copied' : ''}`}/>
            </div>
          </a>
          <a href={`tel:${phone}`} className={"contacts_content__item"}>
            <div className={"contacts_content__iconBox"}>
              <PhoneIcon className={"contacts_content__item--icon"} />
            </div>
            <div className={"contacts_content__contentBox"}>
              <span className={"contacts_content__item--text"}>+38(068)-524-14-17</span>
              <span className={"contacts_content__item--descr"}>{t('contacts.phoneDescr')}</span>
            </div>
            <div
              className={"contacts_content__copyBox"}
              onClick={e => handleCopy(e, 'phone')}
            >
              <CopyIcon className={`contacts_content__item--copy ${isPhoneCopied ? 'copied' : ''}`} />
            </div>
          </a>
        </div>

        <div className={"contacts_content__description"}>
          <span>{t('contacts.descr')}</span>
        </div>
      </div>
    </div>
  );
}

export { Contacts };
