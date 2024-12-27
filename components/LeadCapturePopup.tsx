import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LeadCapturePopupProps {
  trigger: React.ReactNode; // Триггер передается как дочерний элемент
}

const LeadCapturePopup: React.FC<LeadCapturePopupProps> = ({ trigger }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Спасибо! Ваши данные успешно отправлены.');
    setFormData({ name: '', email: '' }); // Очистить форму
  };

  return (
    <Dialog.Root>
      {/* Используем trigger как дочерний элемент */}
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      {/* Содержимое попапа */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-10" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-20 sm:max-w-[425px]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Заголовок и описание */}
            <div>
              <Dialog.Title className="text-xl font-bold">
                Начните свой путь с INSIDE.AI
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 mt-2">
                Заполните эту форму, чтобы начать работать с INSIDE.AI.
              </Dialog.Description>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Введите ваше имя"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Введите ваш email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Отправить
              </button>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LeadCapturePopup;
