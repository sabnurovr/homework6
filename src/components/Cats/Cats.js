import { useState, useEffect } from 'react';
import axios from 'axios';

function Cats() {
    const [cats, setCats] = useState([]);
    const [newCat, setNewCat] = useState({ title: '', description: '', url: '' });
    const [editingCat, setEditingCat] = useState(null);

    useEffect(() => {
        axios.get('https://cataas.com/api/cats?limit=10&skip=0')
            .then((response) => {
                setCats(response.data);
            })
            .catch((error) => {
                console.error('Ошибка получения котиков:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCat({
            ...newCat,
            [name]: value,
        });
    };

    const addCat = () => {
        axios.post('https://cataas.com/api/cats', newCat)
            .then((response) => {
                setCats([...cats, response.data]);
                setNewCat({ title: '', description: '', url: '' });
            })
            .catch((error) => {
                console.error('Ошибка добавления котика:', error);
            });
    };

    const updateCat = () => {
        axios.put(`https://cataas.com/api/cats/${editingCat.id}`, editingCat)
    .then(() => {
            const updatedCats = cats.map((cat) => (cat.id === editingCat.id ? editingCat : cat));
            setCats(updatedCats);
            setEditingCat(null);
        })
            .catch((error) => {
                console.error('Ошибка обновления котика:', error);
            });
    };

    const deleteCat = (id) => {
        axios.delete(`https://cataas.com/api/cats/${id}`)
    .then(() => {
            const updatedCats = cats.filter((cat) => cat.id !== id);
            setCats(updatedCats);
        })
            .catch((error) => {
                console.error('Ошибка удаления котика:', error);
            });
    };

    return (
        <div className="App">
            <h1>Посты о котиках</h1>
            <div className="cat-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Заголовок"
                    value={newCat.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Описание"
                    value={newCat.description}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="url"
                    placeholder="URL изображения"
                    value={newCat.url}
                    onChange={handleInputChange}
                />
                {editingCat ? (
                    <button onClick={updateCat}>Сохранить изменения</button>
                ) : (
                    <button onClick={addCat}>Добавить котика</button>
                )}
            </div>
            <div className="cat-list">
                {cats.map((cat) => (
                    <div key={cat.id} className="cat-item">
                        <img src={cat.url} alt={cat.title} />
                        <h2>{cat.title}</h2>
                        <p>{cat.description}</p>
                        <button onClick={() => setEditingCat(cat)}>Редактировать</button>
                        <button onClick={() => deleteCat(cat.id)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cats;