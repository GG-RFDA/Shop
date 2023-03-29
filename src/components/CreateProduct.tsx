import React, {useState} from 'react'
import {IProduct} from "../models";
import axios from 'axios'
import {ErrorMessage} from "./ErrorMessage";
// Создаём productData, указываем тип IProduct и передаём данные
const productData: IProduct = {
    title: '',
    price: 13.5,
    description: 'lorem inspum set',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
    rating: {
        rate: 42,
        count: 10
    }
}
// Создаём интерфейс CreateProductProps
interface CreateProductProps {
    /*
     * Это будет функция, которая ничего не возвращает.
     * В метод передаём параметр product типа IProduct.
     */
    onCreate: (product: IProduct) => void

}
// Создаём функцию CreateProduct, передаём в нее метод onCreate и указываем тип
export function CreateProduct({ onCreate }: CreateProductProps) {
    // Создаём состояние для value
    const [value, setValue] = useState('')
    // Создаём состояние для error
    const [error, setError] = useState('')
    /*
     * Создаём асинхронную стрелочную функцию submitHandler.
     * Передаём в функцию event и прописываем для event специальный тип.
     */
    const submitHandler = async (event: React.FormEvent) => {
      /*
       * Прерываем действие по умолчанию.
       * Это делается для того, чтобы страница при создании нового продукта не обновлялась.
       */
      event.preventDefault()
      // Каждый раз, когда заходим в submitHandler, чистим ошибку в том случае, если введены нормальные данные
      setError('')
      /*
       * Eсли длина в value равняется 0, то выводится ошибка.
       * trim используется для удаления пробелов с начала и конца строки.
       */
      if (value.trim().length === 0)  {
          setError('Please enter valid title.')
          // Делаем return, чтобы элемент дальше не создавался
          return
      }

      productData.title = value
      // Создаём асинхронный запрос
      const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
      /*
       * В случае, если продукт был успешно создан, вызываем onCreate.
       * Передаём в метод onCreate response.data.
       */
      onCreate(response.data)
    }

    return (
      /*
       * Создаём поле ввода информации.
       * Указываем тип вводимой информации.
       * Задаём стили для поля ввода.
       * Чтобы соединить input и состояние, прописываем сюда value.
       * Добавляем событие onChange для того, чтобы можно было в поле ввода печатать текст.
       * В событии onChange изменяем setValue.
       * В случае, если была ошибка, выводим сообщение.
       * Создаём кнопку, добавляем в неё стили и текст.
       */
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="border py-2 px-4 mb-2 w-full outline-0"
            placeholder="Enter product title..."
            value={value}
            onChange={event => setValue(event.target.value)}
          />
            <ErrorMessage error={error} />
          <button type="submit" className="py-2 px-4 border bg-yellow-400 hover: text-white">Create</button>
        </form>
    )
}
