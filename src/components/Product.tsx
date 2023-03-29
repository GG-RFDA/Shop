import React, {useState} from 'react'
import {IProduct} from "../models";
// Прописываем интерфейс, который будет описывать параметры для компонента
interface ProductProps {
    // Ожидаем всего лишь один параметр типа IProduct
    product: IProduct
}
/*
 * Экспортируем функцию Product.
 * Передаём в функцию пропс типа ProductProps.
 * Забираем конкретное поле из объекта (product).
 * Это сделано для того, чтобы каждый раз не прописывать "props".
 */
export function Product({ product }: ProductProps) {
    /*
     * Создаём состояние для видимости детального описания товара.
     * Первым элементом передаём непосредственно само состояние, а вторым - функцию, изменяющую состояние.
     */
    const [details, setDetails] = useState(false)
    // Создаём класс, изменяющий цвет кнопки в зависимости от значения details
    const btnClassName = details ? 'bg-yellow-400' : 'bg-blue-400'
    // Создаём массив классов
    const btnClasses = ['py-2 px-4 border', btnClassName]


    return (
        /*
         * Создаём блок div и задаём для него стилистику.
         * Далее выводим изображение, задаем ему размер и название.
         * Далее используем теги p для разметки названия и цены товара.
         * Далее добавляем кнопку, отвечающую за показ описания товара.
         * Оборачиваем блок div в фигурные скобки и спрашиваем, является ли details true.
         * Если details находится в значении true, то выводим описание товара и рейтинг.
         */
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2"
        >
            <img src={product.image} className="w-1/6" alt={product.title} />
            <p>{ product.title}</p>
            <p className="font-bold">{product.price}</p>
            <button
            // Передаём динамику, указываем btnClasses, используем метод join и соединяем через пробел.
              className={btnClasses.join(' ')}
              /*
               * Помещаем в кнопку слушатель события.
               * Передаём функцию, изменяющее состояние.
               * Передаём в функцию значение, принимающее в себя предыдущее состояние.
               * Отталкиваюсь от предыдущего состояния, можно изменить текущее состояние.
               * Меняем состояние на противоположное.
               * Далее выводим динамический текст.
               * Если details находится в значении true, то можно скрыть детальное описание.
               */
              onClick={() => setDetails(prev => !prev)}
            >
                { details ? 'Hide Details' : 'Show Details'}
            </button>
             
            {details && <div>
                <p>{ product.description }</p>
                <p>Rate: <span style={{fontWeight: 'bold'}}>{product?.rating?.rate}</span></p>
            </div>}
        </div>
    )
}