import React from 'react';

export default async function upload(event: any) {
  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  event.preventDefault();

  const form = event.currentTarget;
  const fileInput: any = Array.from(form.elements).find(
    ({ name }: any) => name === 'file'
  );

  const formData = new FormData();

  for (const file of fileInput.files) {
    formData.append('file', file);
  }

  formData.append('upload_preset', 'lexyspace-uploads');

  const data = await fetch(
    'https://api.cloudinary.com/v1_1/the-tribe/auto/upload',
    {
      method: 'POST',
      body: formData,
    }
  ).then((r) => r.json());

  return data;
}
