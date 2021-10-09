const BASEURL = "https://monopolylife.ru/api"

passRouter = (name) => {
    window.open(name)
}

queryTemplate = async (params) => {
    let xhttp = new XMLHttpRequest()

    let res = ''

    let options = {
        method: params.method,
        url: params.isFile ? params.file : `${BASEURL}/${params.query}` ,
        header: {
            type: "application/x-www-form-urlencoded"
        }
    }
    xhttp.open(options.method, options.url)
    xhttp.setRequestHeader('Content-Type', options.header.type);
    xhttp.responseType = 'json'
    xhttp.addEventListener('readystatechange', () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            res = xhttp.response
            localStorage.setItem(params.storage, JSON.stringify(res))
        }
    })
    await xhttp.send()

    return
}

getState = async () => {
    // getProjects

    template = (obj) => {
        return `<div class="grid__item">
        <div class="project-card">
          <div class="project-card__image">
            <img src="${obj.image}" alt="">
          </div>
  
          <div class="project-card__profile">${obj.category}</div>
  
          <div class="project-card__place">
            <span class="icon">
              <svg width="12" height="17">
                <use href="img/sprite.svg#location"></use>
              </svg>
            </span>
            <span>${obj.location}</span>
          </div>
  
          <div class="project-card__title">
            ${obj.title}
          </div>
        </div>
      </div>`
    }

    getProjects = async () => {
        let options = {
            method: "GET",
            query: 'projects',
            storage: 'projects',
            isFile: false
        }

        await queryTemplate(options)
    }

    // getCategories 
    getCategories = async () => {
        let options = {
            method: "GET",
            query: 'categories',
            storage: 'cats',
            isFile: false
        }

        await queryTemplate(options)
    }
    // prepare arrays
    prepareArrays = (params) => {
        let projects = params.projects.slice(0,3),
            cats = params.cats,
            result = [];


        projects.forEach(post => {
            result.push({
                title: post.title,
                category: cats.filter(item => {
                    return item.id == post.category ? item.title : ''
                })[0].title,
                location: post.location,
                image: post.image
            })
        })


        return result
    }

    // render
    renderThis = async () => {
        let projects = JSON.parse(localStorage.projects),
            cats = JSON.parse(localStorage.cats),
            block = document.getElementById('loadContent'),
            arr = prepareArrays({ projects: projects, cats: cats }),
            html = ''

        arr.forEach((item, index) => {
            let tpl = template(item)
            html += tpl
        })

        block.innerHTML = html
    }

    await getProjects()
    await getCategories()
    await renderThis()

}

getFAQ = async () => {
    _tpl = (params) => {
        return `<div class="faq-info__item">
        <div class="faq-info__toggle  js-collapse-faq-toggle" data-target-faq="#question-${params.id}">
          <div class="faq-info__question">
            <h3>${params.title}</h3>
          </div>

          <div class="faq-info__icon">
            <svg width="18" height="10">
              <use href="img/sprite.svg#arrow-black"></use>
            </svg>
          </div>
        </div>

        <div class="faq-info__collapse" id="question-${params.id}">
          <div class="faq-info__text">
            <p>${params.describe}</p>
          </div>
        </div>
      </div>`
    }

    getItems = async () => {
        let options = {
            method: 'get',
            isFile: true,
            file: './faq.list.json',
            storage: 'faq'
        }

        queryTemplate(options)
    }

    renderFAQ = async () => {
        let doc = document.getElementById('loadFaq'),
            faq = JSON.parse(localStorage.faq),
            html = '';

        faq.forEach(item => {
            let tpl = _tpl(item)
            html += tpl
        })
        
        doc.innerHTML = html
    }


    await getItems()
    await renderFAQ()
}

(getState)();
(getFAQ)();


