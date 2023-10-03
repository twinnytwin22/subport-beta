import React from 'react';

const FormInput = ({ label, id, type, register, required = false, placeholder = '' }: any) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      {...register(id, { required })}
    />
  </div>
);

const FormSelect = ({ label, id, options, register }: any) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">
      {label}
    </label>
    <select
      id={id}
      className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...register(id, { required: true })}
    >
      {options.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FormTextArea = ({ label, id, register, required = false, placeholder = '' }: any) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">
      {label}
    </label>
    <textarea
      id={id}
      className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      {...register(id, { required })}
    />
  </div>
);

const FormStep = ({ step, fields, onSubmit, onBack, handleResetClick }: any) => (
  <div>
    <form onSubmit={onSubmit}>
      <h2 className="text-center w-full py-4 text-lg">
        Step {step}
      </h2>

      {fields.map((fieldProps: any) => (
        <div key={fieldProps.id} className="mb-6">
          {fieldProps.type === 'textarea' && (
            <FormTextArea {...fieldProps} />
          )}
          {fieldProps.type === 'select' && (
            <FormSelect {...fieldProps} />
          )}
          {fieldProps.type === 'input' && (
            <FormInput {...fieldProps} />
          )}
        </div>
      ))}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
        <button
          type="reset"
          onClick={handleResetClick}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
);

export {FormInput, FormSelect, FormStep, FormTextArea}