document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const articlesList = document.getElementById('articlesList');
    const addArticleBtn = document.getElementById('addArticleBtn');
    const addArticleForm = document.getElementById('addArticleForm');
    const articleForm = document.getElementById('articleForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const currentYear = document.getElementById('currentYear');
    
    // Mostrar año actual en el footer
    currentYear.textContent = new Date().getFullYear();
    
    // Datos de ejemplo con tu imagen blog.png
    let articles = [
        {
            title: "Mi primer artículo",
            image: "blog.png",
            imageData: "img/blog.png", 
            description: "Este es mi primer artículo en este blog personal. Estoy muy emocionado de compartir mis pensamientos y experiencias con ustedes.",
            author: "Tu Nombre",
            date: new Date().toISOString().split('T')[0] // Fecha actual
        },
        {
            title: "Aprendiendo desarrollo web",
            image: "java.png",
            imageData: "img/java.png",
            description: "En este artículo comparto mi experiencia aprendiendo HTML, CSS y JavaScript. Estos son los fundamentos para construir cualquier sitio web moderno.",
            author: "Tu Nombre",
            date: "2023-05-15"
        }
    ];
    
    // Mostrar artículos al cargar la página
    renderArticles();
    
    // Event listeners
    addArticleBtn.addEventListener('click', showAddArticleForm);
    cancelBtn.addEventListener('click', hideAddArticleForm);
    articleForm.addEventListener('submit', handleFormSubmit);
    imageInput.addEventListener('change', handleImageUpload);
    
    // Funciones
    function renderArticles() {
        // Ordenar artículos por fecha (más antiguo primero)
        articles.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Limpiar la lista
        articlesList.innerHTML = '';
        
        // Generar HTML para cada artículo
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.className = 'article';
            
            const imageHTML = article.imageData 
                ? `<img src="${article.imageData}" alt="${article.title}" class="article-image">`
                : `<div class="no-image">Imagen no disponible</div>`;
            
            articleElement.innerHTML = `
                ${imageHTML}
                <h2>${article.title}</h2>
                <div class="meta">
                    <span>Por: ${article.author}</span>
                    <span>Publicado: ${formatDate(article.date)}</span>
                </div>
                <p class="description">${article.description}</p>
            `;
            
            articlesList.appendChild(articleElement);
        });
    }
    
    function showAddArticleForm() {
        addArticleForm.classList.remove('hidden');
        articlesList.classList.add('hidden');
        addArticleBtn.classList.add('hidden');
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
    }
    
    function hideAddArticleForm() {
        addArticleForm.classList.add('hidden');
        articlesList.classList.remove('hidden');
        addArticleBtn.classList.remove('hidden');
        articleForm.reset();
        imagePreview.style.display = 'none';
        imagePreview.innerHTML = '';
    }
    
    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function(event) {
            imagePreview.innerHTML = `<img src="${event.target.result}" alt="Vista previa">`;
            imagePreview.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const author = document.getElementById('author').value;
        const date = document.getElementById('date').value || new Date().toISOString().split('T')[0];
        const file = imageInput.files[0];
        
        if (!file) {
            alert('Por favor selecciona una imagen');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const newArticle = {
                title,
                image: file.name,
                imageData: event.target.result,
                description,
                author,
                date
            };
            
            articles.push(newArticle);
            renderArticles();
            hideAddArticleForm();
        };
        
        reader.readAsDataURL(file);
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }
});