import {useEffect, useState} from 'react'
// Импортируем интерфейс IProduct
import {IProduct} from '../models'
// Импортируем пакет axios,с помощью которого будем совершать асинхронные запросы
import axios, {AxiosError} from 'axios'
// Создаём кастомный хук useProducts
export function useProducts() {
    /*
     * Создаём состояние для продуктов.
     * По умолчанию будет пустой массив
     * Указываем тип у useState как IProduct[].
     */
    const [products, setProducts] = useState<IProduct[]>([])
    // Создаём состояние для индикации загрузки
    const [loading, setLoading] = useState(false)
    // Создаём состояние ошибки
    const [error, setError] = useState('')
    /*
     * Создаём функцию добавления продуктов.
     * Функция будет принимать параметр product типа IProduct.
     */
    function addProduct(product: IProduct) {
        /*
         * Вызываем метод setProducts.
         * Здесь возвращаем новый массив.
         * Разворачиваем предыдущее состояние и в конец добавляем product.
         */
        setProducts(prev => [...prev, product])
    }
    // Создаём асинхронную функцию
    async function fetchProducts() {
        try {
            // Если заново начали загружать данные, то очищаем ошибку и передаём пустую строку
            setError('')
            // Как только начинается загрузка данных, помещаем setLoading в значение true
            setLoading(true)
            /*
             * Обращаемся к axios, где реализуем метод get.
             * Передаём в axios тип данных как дженерик и ожидаем Product[].
             * Указываем в запросе ограниченное число элементов.
             */
            const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5')
            setProducts(response.data)
            // Как только заканчивается загрузка данных, помещаем setLoading в значение false
            setLoading(false)
        } catch (e) {
            // Создаём объект ошибки
            const error = e as AxiosError
            // В случае, если произошла ошибка, помещаем setLoading в значение false
            setLoading(false)
            // Изменяем состояние ошибки на error.message
            setError(error.message)
        }
    }
    // Первым параметром передаём callback, а вторым - массив зависимостей, от которых callback зависит
    useEffect(() => {
        // Вызываем ранее созданную функцию
        fetchProducts()
    }, [])
    // Возвращаем данные, необходимые для дальнейшей работы
    return { products, error, loading, addProduct}
}