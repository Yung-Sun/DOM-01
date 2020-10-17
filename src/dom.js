window.dom = {
    create(string) {
        const container = document.createElement("template");
        //trim()用于去除字符串两端的空格，否则firstChild就会读取到标签前的空格，变成字符节点。
        container.innerHTML = string.trim();
        return container.content.firstChild;

    },

    //在一个节点后面增加新节点,即使没有下一个节点，也是可以用的
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibing)
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        //node.parentNode.appendChild(parent)
        dom.before(node, parent)
        dom.append(parent, node)
    },

    //删
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        //const { childNode } = node 相当于 childNodes = node.childNodes
        const { childNode } = node
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) {//重载
        //arguments.length表示参数的个数
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) { //适配
        if (arguments.length === 2) {
            if ('node.innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('node.innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        contains(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};