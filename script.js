window.onload = function () {
    const inputs = document.querySelectorAll('input[data-action]');

    for (let input of inputs) {
        if (input.getAttribute('data-action') === 'preview') {
            if (input.hasAttribute('data-preview')) {
                const preview = document.getElementById(input.getAttribute('data-preview'));

                if (preview) {
                    const event = new Event('change');

                    input.addEventListener('change', loadingPreviewImage);
                    input.dispatchEvent(event);
                    
                    continue;
                }

                console.error(
                    'O atributo elemento com o id ' + 
                    input.getAttribute('data-preview') + 
                    ' para o preview não foi definido'
                );

                continue;
            }
            
            console.error('O atributo "data-preview" não foi definido');
        }
    }
}

function loadingPreviewImage(event) {
    const 
        input   = event.target,
        preview = document.getElementById(input.getAttribute('data-preview')); 

    preview.innerHTML = null;

    if (input.files.length > 0) {
        for (let file of input.files) {
            const 
                reader = new FileReader(),
                figure = document.createElement("figure"),
                figCap = document.createElement("figcaption");

            figCap.innerText = file.name;
            figure.appendChild(figCap);

            reader.onload = () => {
                const img = document.createElement("img");
                
                if (figCap.innerText.split('.').pop() == 'pdf') {
                    img.setAttribute("src", "pdf.png");
                } else {
                    img.setAttribute("src", reader.result);
                }

                figure.insertBefore(img, figCap);
            }

            preview.appendChild(figure);
            reader.readAsDataURL(file);
        }

        return;
    }   

    const p = document.createElement('p');
    
    p.textContent = 'Nenhum arquivo foi escolhido.';
    preview.append(p);
}