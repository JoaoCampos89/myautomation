/**
 * [clearErrors clear all errors in template erros dict]
 * @param  {[Template]} template [Template instance]
 * @param  {[array]} fields   [array of form fields]
 * @return {[null]}          [null]
 */
export function clearErrors(template,fields){
  const errors = {};
  errors.forEach(fields, function(field){
    errors[field] = [];
  });

  template.errors.set(errors);
}

/**
 * [handleErrors description]
 * @param  {[errors]} err      [errors returned by the method call]
 * @param  {[Template]} template [Template instance]
 * @param  {[array]} fields   [form fields]
 * @return {[null]}
 */
export function handleErrors(err,template,fields){
  clearErrors(template,fields)
  const errors = {};
  if (err.error === 'validation-error') {
          // Initialize error object
          // Go through validation errors returned from Method
          err.details.forEach((fieldError) => {
            // XXX i18n
            errors[fieldError.name].push(fieldError.type);
          });

          // Update ReactiveDict, errors will show up in the UI
          template.errors.set(errors);
        }
}
