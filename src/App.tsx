import {Product} from './components/Product'
import {useProducts} from './hooks/useProducts'
import {Loader} from "./components/Loader";
import {ErrorMessage} from "./components/ErrorMessage";
import {Modal} from "./components/Modal";
import {CreateProduct} from "./components/CreateProduct";
import {useState} from "react";
import {IProduct} from "./models";

function App() {
    // Вызываем useProducts и забираем необходимые поля
    const {loading, error, products, addProduct} = useProducts()
    /*
     * Создаём состояние видимости модального окна.
     * Когда пользователь заходит в web-приложение, то модальное  окно будет отображаться.
     */
    const [modal, setModal] = useState(true)
  
    const createHandler = (product: IProduct) => {
      setModal(false)
      // Вызываем метод addProduct с параметром product
      addProduct(product)
    }

    return (
      /*
       * Создаём блок div и задаём для него стилистику.
       * Если состояние загрузки равно true, то вызываем компонент Loader.
       * Если ошибка произошла, то вызываем компонент ErrorMessage.
       * Преобразуем массив products при помощи метода map.
       * На каждой итерации получаем продукт.
       * Каждый продукт преобразуем в компонент.
       * Добавляем ключ для того, чтобы React мог высокоэффективно рендерить шаблон и понимал, где и какие уникальные компоненты находятся.
       * Вызываем компонент Modal и задаём заголовок для модального окна.
       * Как только продукт был создан, изменяем состояние модального окна на false.
       */
        <div className="container mx-auto max-w-2xl pt-5">
          { loading && <Loader /> }
          { error &&  <ErrorMessage error={error} /> }
          { products.map(product => <Product product={product} key={product.id} />) }
          { modal && <Modal title="Create new product" onClose={() => setModal(false)}>
             <CreateProduct onCreate={createHandler} />
          </Modal>}

        </div>
    )
}
export default App;
