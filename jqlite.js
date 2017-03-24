/**
 * Created by Administrator on 2017/3/24.
 */
(function (window, undefined) {

    var slice = Array.prototype.slice;

    var $ = function (selector, context) {
        return new $.fn.init(selector, context);
    };

    $.fn = $.prototype = {
        constructor: $,
        init: function (selector, context) {
            var match, elem;
            // handle: $("") $(null) $(undefined) $(false)
            if (!selector) {
                return this;
            }
            var nodeList = (context || document).querySelectorAll(selector);
            this.length = nodeList.length;
            for (var i = 0, len = this.length; i < len; i++) {
                this[i] = nodeList[i];
            }
            return this;
        },
        each: function (func) {
            for (var i = 0, len = this.length; i < len; i++) {
                func.call(this[i],this[i],i);
            }
            return this;
        },
        // 转数组
        toArray: function () {
            return slice.call(this, 0);
        },
        // 转原生集合
        // 获得匹配元素集合或第n个元素
        get: function (num) {
            return num == null ?
                this.toArray() :
                (num < 0 ? this[this.length + num] : this[num]);
        },
        // jQ对象的入栈
        pushStack: function (elems) {
            // this.constructor === $
            var ret = $.merge( this.constructor(), elems);
            ret.prevObject = this;

            return ret;
        },
        merge: function (first, second) {
            var i = first.length,
                l = second.length,
                j = 0;

            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j];
                }
            }
            return first;
        },
        eq: function (i) {
            i = +i;
            return i === -1 ?
                this.slice(i) :
                this.slice(i, i+1);
        }
    };

    $.fn.init.prototype = $.prototype;

    // 扩展对象的方法
    $.extend = $.fn.extend = function (options) {
        for (var p in options) {
            if (options.hasOwnProperty(p)) {
                this[p] = options[p];
            }
        }
        return this;
    };

    // 扩展静态方法
    $.extend({
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        }
    });

    // effect
    $.fn.extend({
        hide: function () {
            this.each(function () {
                this.style.display = "none";
            });
            return this;
        },
        show: function () {
            this.each(function () {
                this.style.display = "block";
            });
            return this;
        }
    });

    // event
    $.fn.extend({
        on: function (e, func) {
            this.each(function (v) {
                v.addEventListener(e, func, false);
            });
            return this;
        },
        off: function (e, func) {
            this.each(function (v) {
                v.removeEventListener(e, func, false)
            });
            return this;
        }
    });

    // attriblues
    $.fn.extend({
        attr: function () {

        }
    });

    // 将$暴露给全局对象
    window.$ = $;

})(window);