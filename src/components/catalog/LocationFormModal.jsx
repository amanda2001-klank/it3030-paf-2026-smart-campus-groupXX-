import React, { useEffect, useState } from 'react';

const emptyForm = {
  building: '',
  floor: '',
  roomCode: '',
  locationName: '',
  address: '',
};

const LocationFormModal = ({ isOpen, mode, initialData, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData(
      initialData
        ? {
            building: initialData.building || '',
            floor: initialData.floor || '',
            roomCode: initialData.roomCode || '',
            locationName: initialData.locationName || '',
            address: initialData.address || '',
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

    if (!formData.building.trim()) {
      nextErrors.building = 'Building is required.';
    }

    if (!formData.floor.trim()) {
      nextErrors.floor = 'Floor is required.';
    }

    if (!formData.roomCode.trim()) {
      nextErrors.roomCode = 'Room code is required.';
    }

    if (!formData.locationName.trim()) {
      nextErrors.locationName = 'Location name is required.';
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
      building: formData.building.trim(),
      floor: formData.floor.trim(),
      roomCode: formData.roomCode.trim(),
      locationName: formData.locationName.trim(),
      address: formData.address.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 px-4 py-8">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'edit' ? 'Edit Location' : 'Create Location'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Capture the building, room, and address details used by the asset catalogue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Building</label>
              <input
                type="text"
                name="building"
                value={formData.building}
                onChange={handleChange}
                placeholder="Engineering Block A"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  errors.building
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.building && <p className="mt-2 text-xs text-red-600">{errors.building}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Floor</label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="3"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  errors.floor
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.floor && <p className="mt-2 text-xs text-red-600">{errors.floor}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Room Code</label>
              <input
                type="text"
                name="roomCode"
                value={formData.roomCode}
                onChange={handleChange}
                placeholder="ENG-A-301"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  errors.roomCode
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.roomCode && <p className="mt-2 text-xs text-red-600">{errors.roomCode}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Location Name</label>
              <input
                type="text"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                placeholder="Advanced Computing Lab"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  errors.locationName
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.locationName && (
                <p className="mt-2 text-xs text-red-600">{errors.locationName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Smart Campus, Main Road, Colombo"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
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
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Location'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationFormModal;
