import React from 'react';
// Создаём интерфейс с необходимым параметром
interface ErrorMessageProps {
    error: string
}
/*
 * Создаём функцию сообщения с ошибкой.
 * Передаём параметр error и описываем его тип.
 */
export function ErrorMessage({ error }: ErrorMessageProps) {
    return (
        // Задаём стиль для сообщения с ошибкой
        <p className="text-center text-red-600">{ error }</p>
    )
}