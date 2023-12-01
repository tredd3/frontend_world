const createElement = (tagName: keyof HTMLElementTagNameMap, attributes: Record<string, string>) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
};

const createHiddenInput = (name: string, value: string) => (
  createElement('input', { name, value, type: 'hidden' }) as HTMLInputElement
);

const createForm = (url: string) => (
  createElement('form', { method: 'post', action: url }) as HTMLFormElement
);

export default (url: string, postBody: Record<string, string>) => {
  const form = createForm(url);

  form.append(
    ...Object.entries(postBody).map(([key, value]) => (
      createHiddenInput(key, value)
    ))
  );

  document.body.append(form);
  form.submit();
};
