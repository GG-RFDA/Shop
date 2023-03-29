import React from 'react';
// Создаём интерфейс ModalProps с определёнными параметрами
interface ModalProps {
  // В children попадает всё, что передаём как внутренний контент
    children: React.ReactNode
    title: string
    onClose: () => void
}
// Создаём функцию Modal, принимающую параметры из интерфейса как объекты, и указываем тип
export function Modal({ children, title, onClose }: ModalProps) {
    return (
      /*
       * Задаём базовую стилистику.
       * В первом блоке div задаём затемнение экрана, когда выводится модальное окно.
       * Во втором блоке div задаём стили для модального окна.
       * В блоке h1 задаём заголовок внутри модального окна.
       * Выводим children.
       */
        <>
          <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0" onClick={onClose}/>
          <div
            className="w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2"
          >
          <h1 className="text-2xl text-center mb-2">{ title }</h1>
          { children }
          </div>
        </>
    )
}
