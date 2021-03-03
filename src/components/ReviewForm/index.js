import React from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '../Input';
import { Button } from '../Button';
import { useForm } from '../../sdk/helper';
import './index.css';

export function ReviewForm({
  className,
  loading,
  error,
  onCreate,
}) {
  const {
    formFields,
    createChangeHandler,
    handleSubmit,
    errors,
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      description: '',
    },
    validate: {
      name: [{ name: 'required', text: 'Field is required' }],
      email: [
        { name: 'required', text: 'Field is required' },
        { name: 'isEmail', text: 'Email is not valid' },
      ],
      description: [
        { name: 'required', text: 'Field is required' },
        { name: 'maxLength', text: 'Description must be less then 170 characters', value: 170 },
      ],
    },
    onSubmit: onCreate,
  });
  const { t } = useTranslation('translation');

  return (
    <form
      className={`reviewForm ${className || ''}`}
      onSubmit={handleSubmit}
    >
      <div className={"reviewForm_title"}>
        <span>{t('review.form.title')}</span>
      </div>
      <Input
        className={"reviewForm_input"}
        label={t('review.form.label.name')}
        name={"username"}
        type={"text"}
        value={formFields.name}
        error={errors.name}
        placeholder={t('review.form.placeholder.name')}
        onChange={createChangeHandler('name')}
      />
      <Input
        className={"reviewForm_input"}
        label={t('review.form.label.email')}
        name={"email"}
        type={"text"}
        value={formFields.email}
        error={errors.email}
        placeholder={t('review.form.placeholder.email')}
        onChange={createChangeHandler('email')}
      />
      <Input
        className={"reviewForm_input"}
        label={t('review.form.label.description')}
        name={"description"}
        type={"textarea"}
        value={formFields.description}
        error={errors.description}
        placeholder={t('review.form.placeholder.description')}
        onChange={createChangeHandler('description')}
        rows={5}
      />

      <Button
        className={"reviewForm_btn"}
        type={"submit"}
      >
        {t('review.form.button')}
      </Button>
    </form>
  );
}
