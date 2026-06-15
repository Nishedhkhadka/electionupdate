document.addEventListener("DOMContentLoaded", function () {
    const safeInit = (initFn) => {
        if (typeof initFn !== 'function') {
            return;
        }

        try {
            initFn();
        } catch (error) {
            console.error(error);
        }
    };

    safeInit(hotCandidate);
    safeInit(flyOutCard);
    safeInit(mobileMenu);
    safeInit(partyMapFilter);
    safeInit(provinceMap);
    safeInit(homeFilters);
    safeInit(electionNews);
    safeInit(candidateToggle);
    safeInit(loadConstituencyMap);
    safeInit(searchModal);
    safeInit(videoPlayer);
});

const mobileMenu = () => {
    $('.hamburger').on('click', function () {
        $('body').addClass('show__side--menu').css({'overflow': 'hidden'});
        $('body').children().not('.navigation').addClass('blur');
        $('.black-overlay').fadeIn(400);
    });


    $(".navigation .menu-container > ul > li:has(ul) ").append('<span  class="fa fa-chevron-down"></span>').addClass('dropdown');
    $('.navigation .menu-container > ul > li.dropdown > span').on('click', function () {
        $(this).parent('li').toggleClass('dropdown-active');
    })
    $('.black-overlay').on('click', function () {
        $('body').removeClass('show__side--menu').css({'overflow': 'auto'});
        $(this).fadeOut(400);

        $('body').children().not('.navigation').removeClass('blur');
    });


}

const hotCandidate = () => {
    $('.popular-candidate .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1.1,
                margin: 10,

            },
            400: {

                items: 1.3,
            },
            600: {
                items: 2.2
            },
            1000: {
                items: 3
            }
        }
    })
}

const flyOutCard = () => {
    $(document)
        .on('mouseover', '.np-map svg g', function () {
            const district = $(this).attr('id');
            if (!['kathmandu', 'lalitpur', 'bhaktapur'].includes(district)) {
                $(`#flyout-card-${district}`).show();
            }
        })
        .on('mouseout', '.np-map svg g', function () {
            const district = $(this).attr('id');
            $(`#flyout-card-${district}`).hide();
        })
        .on('click', '.np-map svg g', function () {
            const district = $(this).attr('id');
            const url = $(`#flyout-card-${district} .candidate-card-header h3 a`).attr('href');

            if (url) {
                //window.location.href = url;
                window.open(url, "_parent");
            }
        });
}

const resultMap = () => {
    const result = constituencyResult();
    result.forEach(r => {
        setMapColor(r.constituency, r.party_color);
    })
}

const constituencyResult = () => {
    const constituencies = $('.np-map .flyout-card:has(.candidate-list .candidate-win .party)');

    let data = [];
    $.each(constituencies, (index, item) => {
        const constituency = $(item).data('const');
        $(item).find('.candidate-win').each(function () {
            const partyColor = $(this).find('.party').data('party-color');

            if (partyColor) {
                data.push({
                    constituency: constituency,
                    party_color: partyColor
                })
            }
        });
    })

    return data;
}

const partyMapFilter = () => {
    $(document).on('click', '.party-filter', function () {
        const partyColor = $(this).data('color');

        if ($(this).hasClass('active') || partyColor === 'all') {
            $('.party-filter').removeClass('active').first().addClass('active');
            resultMap();
        } else {
            $('.party-filter').removeClass('active');
            $(this).addClass('active');

            const result = constituencyResult();

            result.forEach(r => {
                if (partyColor === r.party_color) {
                    setMapColor(r.constituency, r.party_color);
                } else {
                    setMapColor(r.constituency, '#AC1B2A1C')
                }
            })
        }
    })
}

const setMapColor = (constituency, color) => {
    if (!constituency) return;

    $(`#${constituency} > path`).attr('fill', color);
    $(`#${constituency} > polygon`).attr('fill', color);
};

const provinceMap = () => {
    $('.province-map svg g')
        .on('click', function (e) {
            e.stopPropagation(); // prevent event bubbling issues
            let $target = $(e.target); // the actual clicked element
            const districts = $('.province-map').data('districts');
            let district = $target.closest('g').attr('id') || $target.attr('id');
            const districtSlug = districts.find(d => d.slug === district)?.slug;
            const districtUrl = $('.province-map').data('district-url');
            const url = districtSlug ? districtUrl.replace('DISTRICT_SLUG', districtSlug) : null;

            if (url) {
                window.location.href = url;
            }
        });

    const filtered = $('#constituency-map g')
}

const homeFilters = () => {
    const $homeRoot = $('.elec-content-wrap[data-district-url]');

    if (!$homeRoot.length) {
        return;
    }

    const districtUrlTemplate = $homeRoot.attr('data-district-url');

    if (!districtUrlTemplate) {
        return;
    }

    const $smartProvince = $('#smart_filter_province_id');
    const $smartDistrict = $('#smart_filter_district_id');
    const $smartConstituency = $('#smart_filter_constituency_id');
    const $smartFilterForm = $('#smart-filter-form')

    let selectedSmartDistrictId = $smartDistrict.data('selected') || null;
    let selectedSmartConstituencyId = $smartConstituency.data('selected') || null;

    const resetSmartDistricts = () => {
        $smartDistrict.empty();
        $smartDistrict.append('<option value="">जिल्ला</option>');
        $smartDistrict.prop('disabled', true);
    };

    const resetSmartConstituencies = () => {
        $smartConstituency.empty();
        $smartConstituency.append('<option value="">निर्वाचन क्षेत्र छान्नुहोस्</option>');
        $smartConstituency.prop('disabled', true);
    };

    const setSmartConstituencies = (district) => {
        const constituencies = district.f_constituencies || [];

        $smartConstituency.empty();
        $smartConstituency.append('<option value="">निर्वाचन क्षेत्र छान्नुहोस्</option>');

        $.each(constituencies, function (index, constituency) {
            $smartConstituency.append(
                `<option value="${constituency.alias}">${constituency.name}</option>`
            );
        });

        $smartConstituency.prop('disabled', constituencies.length === 0);

        if (selectedSmartConstituencyId) {
            $smartConstituency.val(selectedSmartConstituencyId);
        }
    };

    const fetchSmartDistricts = (provinceId) => {
        const url = districtUrlTemplate.replace('PROVINCE_ID', provinceId);

        $.ajax({
            url: url,
            method: 'GET',
            success: function (res) {
                const districts = res.data;
                $smartDistrict.empty();
                $smartDistrict.data('districts', districts);
                $smartDistrict.append('<option value="">जिल्ला</option>');

                $.each(districts, function (index, district) {
                    $smartDistrict.append(
                        `<option value="${district.id}">${district.name}</option>`
                    );
                });

                $smartDistrict.prop('disabled', false);

                if (selectedSmartDistrictId) {
                    $smartDistrict.val(selectedSmartDistrictId);
                    const selectedDistrict = districts.find((d) => d.id == selectedSmartDistrictId);
                    if (selectedDistrict) {
                        setSmartConstituencies(selectedDistrict);
                    }
                } else {
                    resetSmartConstituencies();
                }
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                resetSmartDistricts();
                resetSmartConstituencies();
            }
        })
    };

    if ($smartProvince.length) {
        const selectedProvinceId = $smartProvince.val();

        if (selectedProvinceId) {
            fetchSmartDistricts(selectedProvinceId);
        }

        $smartProvince.on('change', function () {
            const provinceId = $(this).val();

            if (!provinceId) {
                resetSmartDistricts();
                resetSmartConstituencies();
                return;
            }

            selectedSmartDistrictId = null;
            selectedSmartConstituencyId = null;

            fetchSmartDistricts(provinceId);
        });

        $smartDistrict.on('change', function () {
            const districtId = $(this).val();

            if (!districtId) {
                resetSmartConstituencies();
                return;
            }

            if (selectedSmartDistrictId && districtId != selectedSmartDistrictId) {
                selectedSmartConstituencyId = null;
            }

            const districts = $smartDistrict.data('districts') || [];
            const district = districts.find((d) => d.id == districtId);

            if (district) {
                setSmartConstituencies(district);
            }
        });
    }

    const $homeCandidatesProvince = $('#home_candidates_province_id');
    const $homeCandidatesDistrict = $('#home_candidates_district_id');
    let selectedHomeDistrictId = $homeCandidatesDistrict.data('selected') || null;

    const resetHomeDistricts = () => {
        $homeCandidatesDistrict.empty();
        $homeCandidatesDistrict.append('<option value="">जिल्ला</option>');
        $homeCandidatesDistrict.prop('disabled', true);
    };

    const fetchHomeDistricts = (provinceId) => {
        const url = districtUrlTemplate.replace('PROVINCE_ID', provinceId);

        $.ajax({
            url: url,
            method: 'GET',
            success: function (res) {
                const districts = res.data;
                $homeCandidatesDistrict.empty();
                $homeCandidatesDistrict.append('<option value="">जिल्ला</option>');

                $.each(districts, function (index, district) {
                    $homeCandidatesDistrict.append(
                        `<option value="${district.id}">${district.name}</option>`
                    );
                });

                $homeCandidatesDistrict.prop('disabled', districts.length === 0);

                if (selectedHomeDistrictId) {
                    $homeCandidatesDistrict.val(selectedHomeDistrictId);
                }
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                resetHomeDistricts();
            }
        })
    };

    if ($homeCandidatesProvince.length) {
        const selectedProvinceId = $homeCandidatesProvince.val();

        if (selectedProvinceId) {
            fetchHomeDistricts(selectedProvinceId);
        }

        $homeCandidatesProvince.on('change', function () {
            const provinceId = $(this).val();

            if (!provinceId) {
                resetHomeDistricts();
                return;
            }

            selectedHomeDistrictId = null;

            fetchHomeDistricts(provinceId);
        });
    }

    if ($smartFilterForm.length) {
        $smartFilterForm.on('submit', function (e) {
            e.preventDefault();

            const constituencySlug = $smartConstituency.val();
            const constituencyUrlTemplate = $smartConstituency.data('constituency-url');

            if (constituencyUrlTemplate && constituencySlug) {
                window.open(constituencyUrlTemplate.replace('CONSTITUENCY_ALIAS', constituencySlug), "_parent");
            } else {
                const actionUrl = $(this).attr('action');
                const provinceId = $smartProvince.val();
                const districtId = $smartDistrict.val();

                if (actionUrl) {
                    const url = new URL(actionUrl, window.location.origin);

                    if (provinceId) {
                        url.searchParams.set('province_id', provinceId);
                    }

                    if (districtId) {
                        url.searchParams.set('district_id', districtId);
                    }

                    window.open(url.toString(), "_parent");
                }
            }
        });
    }
}

const electionNews = () => {
    if ($('#election-news').length) {
        $.ajax({
            url: '/election-news',
            success: function (data) {
                $('#election-news')
                    .css('display', 'block')
                    .html(data)
            }
        })
    }
}

const loadConstituencyMap = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    const isMobile = !!md.mobile() && !md.tablet();

    if ($('#constituency-map').length) {
        if (!isMobile) {
            $.ajax({
                url: '/constituency-map',
                success: function (data) {
                    $('#constituency-map')
                        .html(data)
                    resultMap();
                },
                error: function () {
                    $('#constituency-map')
                        .html("")
                }
            })
        } else {
            $('#constituency-map')
                .html("")
        }
    }
}

const candidateToggle = () => {
    $('.type-btn').click(function(){
        var tabID = $(this).data('tab');
        $('.type-btn').removeClass('active');
        $(this).addClass('active');
        $('.candidate-wrapper').fadeOut(200);
        setTimeout(function(){
            $('#'+tabID).fadeIn(200);
        },200);
    });
}

const searchModal = () => {
    const $searchModal = $('.candidate-search-form');
    const $searchInput = $searchModal.find('input[type="search"]');
    const $searchCounter = $searchModal.find('.search-counter');
    const $searchResultList = $searchModal.find('.search-result-list');
    const searchUrl = $searchModal.data('search-url');

    if (!$searchModal.length || !searchUrl || !$searchInput.length) {
        return;
    }

    let searchTimer = null;
    let xhr = null;

    const setCounter = (message) => {
        $searchCounter.text(message).show();
    };

    const toNepaliNumber = (value) => {
        const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return String(value).replace(/\d/g, (digit) => nepaliDigits[Number(digit)]);
    };

    const escapeHtml = (value) => {
        return $('<div>').text(value || '').html();
    };

    const renderResults = (items) => {
        const resultCountText = `${toNepaliNumber(items.length)} वटा नतिजा भेटियो।`;

        if (!items.length) {
            $searchResultList.empty();
            setCounter(resultCountText);
            return;
        }

        const rows = items.map((item) => {
            const name = escapeHtml(item.name);
            const title = escapeHtml(item.title);
            const imageUrl = escapeHtml(item.image_url);
            const link = escapeHtml(item.link);

            const imageBlock = imageUrl
                ? `<img class="candidate-photo" src="${imageUrl}" alt="${name}">`
                : '';

            return `
                <div class="candidate-row">
                    <a href="${link}" class="candidate-media">
                        ${imageBlock}
                        <div>
                            <h3 class="title">${name}</h3>
                            <span>${title}</span>
                        </div>
                    </a>
                </div>
            `;
        }).join('');

        $searchResultList.html(rows);
        setCounter(resultCountText);
    };

    const search = (keyword) => {
        if (xhr && xhr.readyState !== 4) {
            xhr.abort();
        }

        xhr = $.ajax({
            url: searchUrl,
            method: 'GET',
            data: {query: keyword},
            success: function (res) {
                renderResults(res.data || []);
            },
            error: function () {
                $searchResultList.empty();
                setCounter('खोजी गर्दा समस्या भयो। फेरि प्रयास गर्नुहोस्।');
            }
        });
    };

    $searchInput.on('input', function () {
        const keyword = $(this).val().trim();

        if (searchTimer) {
            clearTimeout(searchTimer);
        }

        if (keyword.length < 3) {
            $searchResultList.empty();
            setCounter('कम्तिमा ३ अक्षर टाइप गर्नुहोस्...');
            return;
        }

        setCounter('खोजी हुँदैछ...');
        searchTimer = setTimeout(function () {
            search(keyword);
        }, 300);
    });

    $searchModal.find('.input-wrap').on('submit', function (e) {
        e.preventDefault();
    });

    $('.btn-trigger').on('click', function () {
        $('body').addClass('show__search--modal');
        $('.candidate-search-form, .search-overlay').fadeIn(400);
        $searchInput.trigger('focus');
    });

    $('.trigger-close, .search-overlay').on('click', function () {
        $('body').removeClass('show__search--modal');
        $('.candidate-search-form').fadeOut(400);
    });
}

const videoPlayer = () => {
    $(document).on("click", ".trigger-player", function (e) {
        e.preventDefault();
        var $cover = $(this).find(".video-cover"),
            video = $(this).data("video");

        $(".video-cover").not($cover)
            .removeClass("is-playing")
            .find("iframe").remove();

        if ($cover.hasClass("is-playing")) return;

        $cover.addClass("is-playing")
            .append('<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    });
}
