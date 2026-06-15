/** @namespace dnn */
window.dnn = window.dnn || {};
(function (ns) {
    var visitingDeviceisMobile = false;
    if (/(android|bb\d+|meego).+mobile|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|avantgo|bada\/|blackberry|blazer|compal|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        visitingDeviceisMobile = true;
    }
    // Common Http Verbs
    ns.HTTP_GET = 'GET';
    ns.HTTP_PUT = 'PUT';
    ns.HTTP_HEAD = 'HEAD';
    ns.HTTP_POST = 'POST';
    ns.HTTP_PATCH = 'PATCH';
    ns.HTTP_DELETE = 'DELETE';

    ns.CONTENT_TYPE_JSON = 'application/json';
    var defaultHandlers = [];

    /**
     * dnn.render( id )
     *
     * Fetch a JavaScript template for an id, and return a templating function for it.
     *
     * @param {string} id A string that corresponds to a DOM element with an id prefixed with "tmpl-".
     *                    For example, "attachment" maps to "dnn-attachment".
     * @return {function} A function that lazily-compiles the template requested.
     */
    dnn.render = _.memoize(function (id) {
        var compiled,
            /*
             * Underscore's default ERB-style templates are incompatible with PHP
             * when asp_tags is enabled, so WordPress uses Mustache-inspired templating syntax.
             *
             * @see trac ticket #22344.
             */
            options = {
                evaluate: /<#([\s\S]+?)#>/g,
                interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
                escape: /\{\{([^\}]+?)\}\}(?!\})/g,
                variable: 'data'
            };

        return function (data) {
            compiled = compiled || _.template($('#el-' + id).html(), options);
            return compiled(data);
        };
    });

    // CSRF Token
    dnn.csrfToken = $("meta[name=csrf]").attr('content');

    dnn.adminBaseUrl = '';

    //
    dnn.deviceType = (visitingDeviceisMobile) ? 'mobile' : 'desktop';

    /*
     * Template Code
     */
    dnn.template = {
        toggleStatus: function (obj, response) {
            var label = 'YES', labelClass = 'label-success';

            if (!response.status) {
                label = 'NO';
                labelClass = 'label-warning';
            }

            var html = '<span class="label ' + labelClass + '">' + label + '</span>';
            obj.html(html);

        },

        loading: function (obj, response, isLoading) {
            if (isLoading == false) {
                this.toggleStatus(obj, response);
            } else {
                obj.html('<span class="label label-info"><i class="fa fa-cog fa-spin"></i></span>');
            }
        }
    }
    //image caption
    dnn.prixaImageCaption = function (e) {
        if (!e.wrapper) throw new Error("Wrapper field is required. Try adding wrapper: 'className' in your options.");
        if ("string" != typeof e.wrapper) throw new Error("Wrapper must be string. Try adding wrapper: 'className' in your options.");
        var r = "";
        e.imageWrapper && (r = e.imageWrapper), this.each(function () {
            if ($(this).is("img") && $(this).attr("alt")) {
                var a = $(this).attr("alt"),
                    i = $('<div class="' + r + '"></div>');
                $image = $(this).clone();
                var n = $(this).getStyleObject();
                n.float && ("right" != n.float && "left" != n.float || (i.css({
                    float: n.float,
                    overflow: "hidden"
                }), $image.css({
                    float: "none"
                }))), i.append($image), i.append('<span class="' + e.wrapper + '">' + a + "</span>"), $(this).replaceWith(i)
            }
        })
    }

    /*
     * Exception
     */
    dnn.exception = {
        Exception: function (message) {
            this.message = message;
            this.toString = function () {
                return this.message;
            };
        }
    }

    /*
     * Ajax Setup
     */
    dnn.ajax = {
        request: function (url, method, data) {
            data = filterData(data);
            var promise = createXhrPromise(url, method, data);

            // Add a new handler 'error' to the promise
            addErrorHandler(promise);

            // register default handlers in the promise
            registerDefaultHandlers(promise);

            return promise;
        },
        get: function (url, data) {
            return this.request(url, ns.HTTP_GET, data);
        },

        head: function (url, data) {
            return this.request(url, ns.HTTP_HEAD, data);
        },

        post: function (url, data) {
            return this.request(url, ns.HTTP_POST, data);
        },

        delete: function (url, data) {
            return this.request(url, ns.HTTP_DELETE, data);
        },

        put: function (url, data) {
            return this.request(url, ns.HTTP_PUT, data);
        },

        patch: function (url, data) {
            return this.request(url, ns.HTTP_PATCH, data);
        },
        addDefaultHandler: function (key, handler) {
            if (typeof (handler) !== 'function') {
                throw new dnn.exception.Exception('Invalid handler provided.');
            }

            defaultHandlers.push({key: key, handler: handler});
        },

        getDefaultHandlers: function () {
            return defaultHandlers;
        },
    }

    /**
     * Ensure the payload to be sent is a regular JSON data
     */
    function filterData(data) {
        // If data is an array, ensure that there aren't any null items
        if ($.isArray(data)) {
            var temp = [];
            for (var i in data) {
                var item = data[i];
                if (item) {
                    temp.push(item);
                }
            }
            data = temp;
        }

        // If data is an object change it to JSON string
        if (typeof (data) === 'object') {
            data = JSON.stringify(data);
        }

        return data;
    }

    function createXhrPromise(url, method, payload) {
        var config = {
            url: url,
            type: method,
            data: payload,
            headers: {'device': dnn.deviceType},
            dataType: 'json'
        };

        // Make Content-Type: application/json only if it has payload
        // That is don't send content-type header explicitly if no payload is present
        if (payload) {
            config.contentType = ns.CONTENT_TYPE_JSON;
        }

        return $.ajax(config);
    }

    function registerDefaultHandlers(promise) {
        defaultHandlers.forEach(function (handler) {
            if (promise[handler.key]) {
                promise[handler.key](handler.handler);
            }
        });
    }

    function addErrorHandler(promise) {
        promise.error = function (callback) {
            promise.fail(function (jqXHR, textStatus, errorThrown) {
                var response = jqXHR.responseJSON || jqXHR.responseText;

                callback(response, textStatus, jqXHR, errorThrown);
            });
            return promise;
        };
    }
}(jQuery));
