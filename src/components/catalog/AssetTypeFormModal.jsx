import React, { useEffect, useState } from 'react';

const emptyForm = {
  code: '',
  name: '',
};

const AssetTypeFormModal = ({ isOpen, mode, initialData, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData(
      initialData
        ? {
            code: initialData.code || '',
            name: initialData.name || '',
          }
        : emptyForm
    );
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.code.trim()) {
      nextErrors.code = 'Asset type code is required.';
    }

    if (!formData.name.trim()) {
      nextErrors.name = 'Asset type name is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 px-4 py-8">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'edit' ? 'Edit Asset Type' : 'Create Asset Type'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Use a stable code such as `LECTURE_HALL` or `PROJECTOR`.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="LECTURE_HALL"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.code
                  ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {errors.code && <p className="mt-2 text-xs text-red-600">{errors.code}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Lecture Hall"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.name
                  ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {errors.name && <p className="mt-2 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Type'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetTypeFormModal;
