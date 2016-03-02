function _autoload() {
    $.each(ACC, function(a, b) {
        $.isArray(b._autoload) && $.each(b._autoload, function(b, d) {
            if ($.isArray(d))
                if (d[1]) ACC[a][d[0]]();
                else {
                    if (d[2]) ACC[a][d[2]]()
                }
            else ACC[a][d]()
        })
    })
}
$(function() {
    _autoload()
});
(function() {
    if (window.matchMedia && window.matchMedia("all").addListener) return !1;
    var a = window.matchMedia,
        b = a("only all").matches,
        c = !1,
        d = 0,
        e = [],
        k = function(b) {
            clearTimeout(d);
            d = setTimeout(function() {
                for (var b = 0, c = e.length; b < c; b++) {
                    var d = e[b].mql,
                        f = e[b].listeners || [],
                        k = a(d.media).matches;
                    if (k !== d.matches) {
                        d.matches = k;
                        for (var k = 0, t = f.length; k < t; k++) f[k].call(window, d)
                    }
                }
            }, 30)
        };
    window.matchMedia = function(d) {
        var g = a(d),
            h = [],
            l = 0;
        g.addListener = function(a) {
            b && (c || (c = !0, window.addEventListener("resize", k, !0)),
                0 === l && (l = e.push({
                    mql: g,
                    listeners: h
                })), h.push(a))
        };
        g.removeListener = function(a) {
            for (var b = 0, c = h.length; b < c; b++) h[b] === a && h.splice(b, 1)
        };
        return g
    }
})();
$("document").ready(function() {
    var a = null,
        b = [],
        c = null,
        d = null;
    $("#question-0-0,#question-0-1").click(function() {
        var a = "genderData=" + $(this).val(),
            b = ACC.config.encodedContextPath + "/my-account/myInterest/gender",
            c = [];
        $("input[name=prevSelectedCats]").each(function() {
            c.push($(this).val())
        });
        $.ajax({
            type: "GET",
            contentType: "JSON",
            url: b,
            data: a,
            success: function(a) {
                var b = "",
                    e = 0;
                $(".gender").addClass("gender");
                $(".myInterestGender").css("display", "none");
                $("fieldset.products").addClass("products active");
                $.each(a,
                    function(a, d) {
                        e++;
                        b = -1 != $.inArray(a, c) ? b + "<input class='category-selection' data-l1='" + d.name + "' checked='checked' type='checkbox' name='categoryCode'id='question-1-" + e + "' value=" + a + "><label for='question-1-" + e + "'><img src='" + ACC.config.commonResourcePath + "/images/qRectangle_3_copy_9.jpeg'><span>" + d.name + "</span></label>" : b + "<input class='category-selection' data-l1='" + d.name + "' type='checkbox' name='categoryCode'id='question-1-" + e + "' value=" + a + "><label for='question-1-" + e + "'><img src='" + ACC.config.commonResourcePath +
                            "/images/qRectangle_3_copy_9.jpeg'><span>" + d.name + "</span></label>"
                    });
                $(".products-questionnaire").html(b)
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })
    });
    $("#catNext").click(function() {
        b = [];
        $("input[name=categoryCode]:checked").each(function() {
            b.push($(this).val())
        });
        1 == b.length ? a = $("input[name=categoryCode]:checked").attr("data-l1") : 2 == b.length && (a = "both");
        var c = [];
        $("input[name=prevSelectedBrands]").each(function() {
            c.push($(this).val())
        });
        if (0 == b.length) throw $(".error.product").text("Please select atleast one product."),
            Error("Please select atleast one product");
        $(".error.product").empty();
        var d = null;
        isAutomate ? ($("#brandNext").text("Update Style Profile"), d = "categoryData=" + JSON.stringify(b) + "&modify=false", $.ajax({
            type: "GET",
            contentType: "JSON",
            url: ACC.config.encodedContextPath + "/my-account/myInterest/modifyCategory",
            data: d,
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })) : d = "categoryData=" + JSON.stringify(b);
        $.ajax({
            type: "GET",
            contentType: "JSON",
            url: ACC.config.encodedContextPath + "/my-account/myInterest/brands",
            data: d,
            success: function(a) {
                var b = "",
                    d = 0;
                $(".myInterestGender").css("display", "none");
                $(".myInterestCategory").css("display", "none");
                $("fieldset.brands").addClass("brands active");
                $.each(a, function(a, f) {
                    d++;
                    b = -1 != $.inArray(a, c) ? b + '<input type="checkbox" class="allBrands" checked="checked" name="brand" id="question-2-' + d + '" value=' + a + '><label for="question-2-' + d + '"><img src="' + ACC.config.commonResourcePath + '/images/logob-bNuon.png"><img class="hover-image" src="' + ACC.config.commonResourcePath + '/images/logou-uNuon.png"><span>' +
                        f.name + "</span></label>" : b + '<input type="checkbox" class="allBrands" name="brand" id="question-2-' + d + '" value=' + a + '><label for="question-2-' + d + '"><img src="' + ACC.config.commonResourcePath + '/images/logob-bNuon.png"><img class="hover-image" src="' + ACC.config.commonResourcePath + '/images/logou-uNuon.png"><span>' + f.name + "</span></label>"
                });
                $("#brandContainer").html(b)
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })
    });
    $("#brandNext").click(function() {
        "Electronics" == a ? $("#objHeading").text("What types of electronics are you interested in?") :
            "Apparel" == a ? $("#objHeading").text("Which outfits represent your personal style?") : "both" == a && $("#objHeadingApparel").text("Which outfits represent your personal style?");
        var e = [];
        $("input[name=brand]:checked").each(function() {
            e.push($(this).val())
        });
        if (0 == e.length) throw $(".error.brand").text("Please select atleast one brand."), Error("Please select atleast one brand");
        $(".error.brand").empty();
        isAutomate ? $.ajax({
            type: "GET",
            contentType: "JSON",
            url: ACC.config.encodedContextPath + "/my-account/myInterest/modifyBrand",
            data: {
                categoryData: JSON.stringify(e)
            },
            success: function() {
                window.location.href = ACC.config.encodedContextPath + "/my-account/myStyleProfile"
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        }) : $.ajax({
            type: "GET",
            contentType: "JSON",
            url: ACC.config.encodedContextPath + "/my-account/myInterest/subcategories",
            data: {
                categoryData: b[0],
                selectedCategory: a,
                subCategoryData: JSON.stringify(e)
            },
            success: function(b) {
                $(".myInterestGender").css("display", "none");
                $(".myInterestCategory").css("display",
                    "none");
                $(".brandsCategory").css("display", "none");
                var e = "",
                    g = 0;
                "both" == a ? ($("fieldset.objects-apparel").addClass("active"), c = b[0], d = b[1], console.log("Directly navigated to electronic"), $.isEmptyObject(c) ? (console.log("in empty apparel block"), e = "", g = 0, $.each(d, function(a, b) {
                            g++;
                            e = e + '<input type="checkbox" name="subCatBrand"id="question-4-' + g + '" value=' + a + '><label for="question-4-' + g + '"><img src="' + ACC.config.commonResourcePath + '/images/dept-2.png"><span>' + b.name + "</span></label>"
                        }), $("#objHeadingElectronics").text("What types of electronics are you interested in?"),
                        $("fieldset.objects-apparel").removeClass("active"), $("#electronicObjects").html(e), $("fieldset.objects-electronics").addClass("active"), console.log("Directly navigated to apparel")) : $.isEmptyObject(d) ? (console.log("Empty electronics"), $.each(c, function(a, b) {
                        g++;
                        e = e + '<input type="checkbox" name="subBrand"id="question-3-' + g + '" value=' + a + '><label for="question-3-' + g + '"><img src="' + ACC.config.commonResourcePath + '/images/dept-2.png"><span>' + b.name + "</span></label>"
                    }), $("#apparelObjects").html(e), $("#apparelFinal").text("Create Style Profile")) :
                    ($.each(c, function(a, b) {
                        g++;
                        e = e + '<input type="checkbox" name="subBrand"id="question-3-' + g + '" value=' + a + '><label for="question-3-' + g + '"><img src="' + ACC.config.commonResourcePath + '/images/dept-2.png"><span>' + b.name + "</span></label>"
                    }), $("#apparelObjects").html(e))) : ($("fieldset.objects").addClass("active"), $.each(b[0], function(a, b) {
                    g++;
                    e = e + '<input type="checkbox" name="subBrandFinal"id="question-3-' + g + '" value=' + a + '><label for="question-3-' + g + '"><img src="' + ACC.config.commonResourcePath + '/images/dept-2.png"><span>' +
                        b.name + "</span></label>"
                }), $("#objects").html(e))
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })
    });
    $("#apparelFinal").click(function() {
        console.log("Create profile with apparel only");
        if ($.isEmptyObject(d)) {
            var a = [];
            $("input[name=subBrand]:checked").each(function() {
                a.push($(this).val())
            });
            if (3 > a.length) throw $(".error.object").text("Please select atleast three objects."), Error("Please select atleast three objects.");
            $(".error.object").empty();
            var b = ACC.config.encodedContextPath +
                "/my-account/myStyleProfile",
                c = "categoryData=" + JSON.stringify(a);
            $.ajax({
                type: "GET",
                contentType: "JSON",
                url: ACC.config.encodedContextPath + "/my-account/myInterest/mySubCategories",
                data: c,
                success: function(a) {
                    window.location.href = b
                },
                error: function() {
                    alert("Something is not right! Please try after sometime")
                }
            })
        } else {
            var g = "",
                h = 0;
            $.each(d, function(a, b) {
                h++;
                g = g + '<input type="checkbox" name="subCatBrand"id="question-4-' + h + '" value=' + a + '><label for="question-4-' + h + '"><img src="' + ACC.config.commonResourcePath +
                    '/images/dept-2.png"><span>' + b.name + "</span></label>"
            });
            $("#objHeadingElectronics").text("What types of electronics are you interested in?");
            var l = [];
            $("input[name=subBrand]:checked").each(function() {
                l.push($(this).val())
            });
            if (3 > l.length) throw $(".error.object").text("Please select atleast three objects."), Error("Please select atleast three objects.");
            $(".error.object").empty();
            $("fieldset.objects-apparel").removeClass("active");
            $("#electronicObjects").html(g);
            $("fieldset.objects-electronics").addClass("active")
        }
    });
    $("#final").click(function() {
        var a = [];
        $("input[name=subBrandFinal]:checked").each(function() {
            a.push($(this).val())
        });
        if (3 > a.length) throw $(".error.object").text("Please select atleast three objects."), Error("Please select atleast three objects.");
        $(".error.object").empty();
        var b = ACC.config.encodedContextPath + "/my-account/myStyleProfile",
            c = "categoryData=" + JSON.stringify(a);
        jQuery.ajax({
            type: "GET",
            contentType: "JSON",
            url: ACC.config.encodedContextPath + "/my-account/myInterest/mySubCategories",
            data: c,
            success: function(a) {
                window.location.href =
                    b
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })
    });
    $("#electronicFinal").click(function() {
        var a = [];
        $("input[name=subCatBrand]:checked").each(function() {
            a.push($(this).val())
        });
        if (3 > a.length) throw $(".error.final").text("Please select atleast three objects."), Error("Please select atleast three objects.");
        $(".error.final").empty();
        var b = ACC.config.encodedContextPath + "/my-account/myStyleProfile",
            c = "categoryData=" + JSON.stringify(a);
        jQuery.ajax({
            type: "GET",
            contentType: "JSON",
            url: ACC.config.encodedContextPath + "/my-account/myInterest/mySubCategories",
            data: c,
            success: function(a) {
                window.location.href = b
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })
    });
    $("#catPrev").click(function() {
        $(".myInterestGender").show();
        $(".gender").addClass("gender active")
    });
    $("#brandPrev").click(function() {
        $(".myInterestCategory").show();
        $(".products").addClass("products active")
    });
    $("#objPrev").click(function() {
        $(".brandsCategory").show();
        $(".brands").addClass("brands active")
    });
    $("#objPrevApparel").click(function() {
        $(".brandsCategory").show();
        $(".brands").addClass("brands active")
    });
    $("#objPrevElectronics").click(function() {
        $.isEmptyObject(c) ? ($(".brandsCategory").show(), $(".brands").addClass("brands active")) : ($(".brandsSubCategoryApparel").show(), $("fieldset.objects-apparel").addClass("active"))
    });
    $(".close.pull-right.my-dept").click(function(a) {
        var b = [],
            c = [];
        if (1 == $(".close.pull-right.my-dept").length) $.ajax({
            type: "GET",
            contentType: "JSON",
            url: ACC.config.encodedContextPath +
                "/my-account/myInterest/removePorfile",
            success: function(a) {
                1 == a && (window.location.href = ACC.config.encodedContextPath + "/my-account/myInterest")
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        });
        else {
            a = $(a.target).attr("data-categoryId");
            b.push(a);
            var d = JSON.stringify(b);
            $.ajax({
                type: "GET",
                contentType: "JSON",
                url: ACC.config.encodedContextPath + "/my-account/myInterest/brands",
                data: {
                    categoryData: d,
                    modify: "false"
                },
                success: function(a) {
                    $.each(a, function(a, b) {
                        c.push(a)
                    });
                    a = JSON.stringify(c);
                    $.ajax({
                        type: "GET",
                        contentType: "JSON",
                        url: ACC.config.encodedContextPath + "/my-account/myInterest/removeCategory",
                        data: {
                            categoryData: d,
                            brandData: a
                        },
                        success: function(a) {
                            window.location.reload()
                        },
                        error: function() {
                            alert("Something is not right! Please try after sometime")
                        }
                    })
                },
                error: function() {
                    alert("Something is not right! Please try after sometime")
                }
            })
        }
    });
    $(".close.pull-right.my-brand").click(function(a) {
        var b = [];
        a = $(a.target).attr("data-brandId");
        b.push(a);
        b = "categoryData=" + JSON.stringify(b);
        $.ajax({
            type: "GET",
            contentType: "JSON",
            data: b,
            url: ACC.config.encodedContextPath + "/my-account/myInterest/removeBrand",
            success: function(a) {
                window.location.reload()
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })
    })
});

function automateMyrecomendationBrandModification(a) {
    $("#brandNext").text("Update Style Profile");
    selectedCats = [];
    selectedCats = a.split(",");
    1 == selectedCats.length ? categorySelected = $("input[name=categoryCode]:checked").attr("data-l1") : 2 == selectedCats.length && (categorySelected = "both");
    var b = [];
    $("input[name=prevSelectedBrands]").each(function() {
        b.push($(this).val())
    });
    if (0 == selectedCats.length) throw $(".error.product").text("Please select atleast one product."), Error("Please select atleast one product");
    $.ajax({
        type: "GET",
        contentType: "JSON",
        url: ACC.config.encodedContextPath + "/my-account/myInterest/brands",
        data: "categoryData=" + selectedCats + "&modify=false",
        success: function(a) {
            var d = "",
                e = 0;
            $(".myInterestGender").css("display", "none");
            $(".myInterestCategory").css("display", "none");
            $("fieldset.brands").addClass("brands active");
            $.each(a, function(a, c) {
                e++;
                d = -1 != $.inArray(a, b) ? d + '<input type="checkbox" class="allBrands" checked="checked" name="brand" id="question-2-' + e + '" value=' + a + '><label for="question-2-' +
                    e + '"><img src="' + ACC.config.commonResourcePath + '/images/logob-bNuon.png"><img class="hover-image" src="' + ACC.config.commonResourcePath + '/images/logou-uNuon.png"><span>' + c.name + "</span></label>" : d + '<input type="checkbox" class="allBrands" name="brand" id="question-2-' + e + '" value=' + a + '><label for="question-2-' + e + '"><img src="' + ACC.config.commonResourcePath + '/images/logob-bNuon.png"><img class="hover-image" src="' + ACC.config.commonResourcePath + '/images/logou-uNuon.png"><span>' + c.name + "</span></label>"
            });
            $("#brandContainer").html(d)
        },
        error: function() {
            alert("Something is not right! Please try after sometime")
        }
    })
}

function myRecomendationCategoryModification(a) {
    a = "genderData=" + a;
    var b = ACC.config.encodedContextPath + "/my-account/myInterest/gender?automate=true",
        c = [];
    $("input[name=prevSelectedCats]").each(function() {
        c.push($(this).val())
    });
    $.ajax({
        type: "GET",
        contentType: "JSON",
        url: b,
        data: a,
        success: function(a) {
            var b = "",
                k = 0;
            $(".gender").addClass("gender");
            $(".myInterestGender").css("display", "none");
            $("fieldset.products").addClass("products active");
            $.each(a, function(a, d) {
                k++;
                b = -1 != $.inArray(a, c) ? b + "<input class='category-selection' data-l1='" +
                    d.name + "' checked='checked' type='checkbox' name='categoryCode'id='question-1-" + k + "' value=" + a + "><label for='question-1-" + k + "'><img src='" + ACC.config.commonResourcePath + "/images/qRectangle_3_copy_9.jpeg'><span>" + d.name + "</span></label>" : b + "<input class='category-selection' data-l1='" + d.name + "' type='checkbox' name='categoryCode'id='question-1-" + k + "' value=" + a + "><label for='question-1-" + k + "'><img src='" + ACC.config.commonResourcePath + "/images/qRectangle_3_copy_9.jpeg'><span>" + d.name + "</span></label>"
            });
            $(".products-questionnaire").html(b)
        },
        error: function() {
            alert("Something is not right! Please try after sometime")
        }
    })
};
$(document).ready(function() {
    var a = $("#pageName").val();
    "overViews" == a ? $("#lnOverView a").addClass("active") : "mplPref" == a ? $("#lnMplPref a").addClass("active") : "addressBook" == a ? $("#lnAddress a").addClass("active") : "orderDetail" == a ? $("#lnOrder a").addClass("active") : "orderHistory" == a ? $("#lnOrder a").addClass("active") : "savedCards" == a ? $("#lnSavedCards a").addClass("active") : "personalInfo" == a ? $("#lnUpdateProfile a").addClass("active") : "invite" == a ? $("#lnInvite a").addClass("active") : "coupons" == a ? $("#lnCoupons a").addClass("active") :
        "review" == a && $("#lnReview a").addClass("active")
});

function editAddress(a) {
    $.ajax({
        url: ACC.config.encodedContextPath + "/my-account/populateAddressDetail",
        type: "GET",
        data: "&addressId=" + a,
        dataType: "json",
        cache: !1,
        contentType: "application/json; charset=utf-8",
        success: function(b) {
            $("#addressId").val(a);
            $("#firstName").val(b.firstName);
            $("#lastName").val(b.lastName);
            $("#line1").val(b.line1);
            $("#line2").val(b.line2);
            $("#line3").val(b.line3);
            $("#postcode").val(b.postcode);
            $("#townCity").val(b.townCity);
            $("#mobileNo").val(b.mobileNo);
            $("#stateListBox").val(b.state);
            "Home" == b.addressType && (document.getElementById("new-address-option-1").checked = !0);
            "Work" == b.addressType && (document.getElementById("new-address-option-2").checked = !0);
            $("#headerAdd").css("display", "none");
            $("#headerEdit").css("display", "block");
            $("#addNewAddress").css("display", "none");
            $("#edit").css("display", "block")
        },
        error: function(a) {
            console.log(a.responseText)
        }
    })
}
$(document).ready(function() {
    $("#addNewAddress").css("display", "block");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#headerAdd").css("display", "block");
    $("#headerEdit").css("display", "none");
    $("#edit").css("display", "none");
    $("#edit").click(function() {
        document.getElementById("addressForm").action = "editAddress";
        document.getElementById("addressForm").commandName = "addressForm"
    });
    $("#checkBox1").click(function() {
        $(this).is(":checked") ? ($(this).parent().css("color", "#000"), $(this).parent().find("label").css("color",
            "#a9143c")) : ($(this).parent().css("color", "#a9a9a9"), $(this).parent().find("label").css("color", "#a9a9a9"))
    });
    $("#new-address-option-1").prop("checked", !0)
});
$(".submit-request").click(function() {
    return null == $("#reasonSelectBox").val() ? (alert("Please select a reason"), !1) : !0
});
$("#returnReject").click(function() {
    window.location = ACC.config.encodedContextPath + "/my-account/orders"
});

function refreshModal(a, b) {
    $("#cancellationreasonSelectBox_" + b + " option#defaultReason").attr("selected", "selected");
    "true" == a && alert("All the related products in the promotion will get cancelled")
}
var Rejectionselectedvalue = null;

function setDropDownValue(a) {
    Rejectionselectedvalue = $("#cancellationreasonSelectBox_" + a + " option:selected").val()
}
$(document).ready(function() {
    $(".cancel-confirm,.cancel-confirm-detail").click(function() {
        var a = $(this).parents(".return-form").attr("id"),
            b = $("#" + a + " .subOrderCodeClass").val(),
            c = $("#" + a + " .ussidClass").val(),
            d = $("#" + a + " .transactionIdClass").val(),
            a = $("#" + a + " .ticketTypeCodeClass").val();
        $("#entryNumber").val();
        var e = $("#cancellationreasonSelectBox_" + d + " option:selected").val(),
            k = Rejectionselectedvalue;
        console.log("Reasone code : " + Rejectionselectedvalue);
        if (null == k || e != Rejectionselectedvalue) return alert("Do let us know why you would like to cancel this item."), !1;
        $.ajax({
            url: ACC.config.encodedContextPath + "/my-account/cancelSuccess",
            type: "GET",
            beforeSend: function() {
                $("body").append("<div id='no-click' style='opacity:0.40; background:#000; z-index: 100000; width:100%; height:100%; position: fixed; top: 0; left:0;'></div><img src='/store/_ui/responsive/common/images/spinner.gif' class='spinner' style=' z-index: 10001;position: fixed;top: 50%;left:50%;height: 30px;'>")
            },
            data: {
                orderCode: b,
                transactionId: d,
                reasonCode: k,
                ticketTypeCode: a,
                ussid: c
            },
            cache: !1,
            success: function(a) {
                splitData =
                    a.split("|");
                a = splitData[1];
                var e = splitData[2];
                "success" == splitData[0] ? ($(".cancellation-request-block #resultTitle").text("Say goodbye!"), $(".cancellation-request-block #resultDesc").text("You've managed to cancel your order sucessfully. More power to you."), $(".reason").css("display", "block"), $(".reason #reasonTitle").text("Reason for Cancellation:"), $(".reason #reasonDesc").text(e)) : ($(".cancellation-request-block #resultTitle").text("Failure!"), $(".cancellation-request-block #resultDesc").text(a),
                    $(".reason").css("display", "none"));
                $("body .spinner,body #no-click").remove();
                $("#cancelOrder" + b).hide();
                $("#cancelSuccess" + b + c).show()
            },
            complete: function() {
                $("body .spinner,body #no-click").remove()
            },
            error: function(a) {
                alert("Error");
                $("body .spinner,body #no-click").remove()
            }
        });
        event.preventDefault()
    })
});
$(document).ready(function() {
    var a = window.location;
    a.pathname.substring(a.pathname.lastIndexOf("/") + 1, a.pathname.length);
    $("#isUnsubcribed").val(!1);
    $("#radioInterest0").is(":checked") && $("#isUnsubcribed").val(!1);
    $("#saveMarketPrefButton").click(function() {
        var a = $("#isUnsubcribed").val(),
            c = [],
            d = [],
            e = [],
            k = "",
            f = "";
        $("input[name='interest']:checked").each(function() {
            k = this.value
        });
        $("input[name='frequency']:checked").each(function() {
            f = this.value
        });
        $.each($("input[name='categoryData']:checked"), function() {
            c.push($(this).val())
        });
        $.each($("input[name='brandData']:checked"), function() {
            d.push($(this).val())
        });
        $.each($("input[name='feedbackArea']:checked"), function() {
            e.push($(this).val())
        });
        a = "interest=" + k + "&categoryData=" + JSON.stringify(c) + "&brandData=" + JSON.stringify(d) + "&frequency=" + f + "&feedBackArea=" + JSON.stringify(e) + "&isUnsubscibed=" + a;
        jQuery.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: ACC.config.encodedContextPath + "/my-account/saveMplPreferences",
            data: a,
            success: function(a) {
                if ("success" == a || "unsubscribed" ==
                    a) window.location.href = ACC.config.encodedContextPath + "/my-account/marketplace-preference?param=" + a
            },
            error: function() {
                alert("Something is not right! Please try after sometime")
            }
        })
    });
    $("#unsubcribe-link").click(function() {
        $("#radioInterest1").prop("checked", !0);
        $("#isUnsubcribed").val(!0);
        $("#radioInterest1").is(":checked") && ($("#radioInterest1").click(), $.each($("input[name='categoryData']:checked"), function() {
            $(this).prop("checked", !1)
        }), $.each($("input[name='brandData']:checked"), function() {
            $(this).prop("checked", !1)
        }), $.each($("input[name='feedbackArea']:checked"), function() {
            $(this).prop("checked", !1)
        }), $("input[name='frequency']:checked").each(function() {
            $(this).prop("checked", !1)
        }))
    })
});

function changeUrl(a) {
    "undefined" != typeof history.pushState ? (a = {
        Url: a
    }, history.pushState(a, a.Title, a.Url)) : alert("ERROR!!!")
}
$(document).ready(function() {
    $("#inviteFriends").click(function() {
        var a = !1,
            b = [],
            c = $("#friendsEmail").val();
        if (0 < c.length) {
            if (0 <= c.indexOf(","))
                for (splitData = c.split(","), splitLen = splitData.length, c = 0; c < splitLen; c++) validateEmailInvite(splitData[c]) ? (a = !0, b.push(splitData[c])) : a = !1;
            else validateEmailInvite(c) ? (a = !0, b.push(c)) : a = !1;
            a ? (a = $("#mytextarea").val(), b = "friends_email_List=" + JSON.stringify(b) + "&textMessage=" + a, jQuery.ajax({
                type: "GET",
                contentType: "JSON",
                url: ACC.config.encodedContextPath + "/my-account/inviteFriends",
                data: b,
                success: function(a) {
                    "success" == a && ($("#friendsEmail").val(""), document.getElementById("errfemail").innerHTML = "<font color='green' size='2'>Invite is sent successfully</font>");
                    "error_email_sending" == a && (document.getElementById("errfemail").innerHTML = "<font color='red' size='2'>Error in email sending</font>");
                    "already_registered_email" == a && (document.getElementById("errfemail").innerHTML = "<font color='red' size='2'>One or more entered email id is/are already registered</font>");
                    "customer_email" ==
                    a && (document.getElementById("errfemail").innerHTML = "<font color='red' size='2'>One or more email is/are same as user's email id</font>")
                },
                error: function() {
                    alert("Something is not right! Please try after sometime")
                }
            })) : document.getElementById("errfemail").innerHTML = "<font color='red' size='2'>Please enter one or more valid email id(s) (for multiple - Separated with commas (,))</font>"
        } else document.getElementById("errfemail").innerHTML = "<font color='red' size='2'>Please enter one or more email id(s)</font>"
    })
});

function kpressfemail() {
    document.getElementById("errfemail").innerHTML = ""
}

function validateEmailInvite(a) {
    var b = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!b.test(a)) return !1;
    if (b.test(a)) return 140 < a.length ? (document.getElementById("errfemail").innerHTML = "<font color='red' size='2'>Please enter valid length for email id </font>", !1) : !0
}

function validateForm() {
    $("#errdoaDay,#errdobDay").empty();
    var a = /^[a-zA-Z ]*$/,
        b = /\s/,
        c = /^(?=\d{2}([-.,\/])\d{2}\1\d{4}$)(?:0[1-9]|1\d|[2][0-8]|29(?!.02.(?!(?!(?:[02468][1-35-79]|[13579][0-13-57-9])00)\d{2}(?:[02468][048]|[13579][26])))|30(?!.02)|31(?=.(?:0[13578]|10|12))).(?:0[1-9]|1[012]).\d{4}$/,
        d = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        e = !0;
    "" == document.getElementById("profilefirstName").value ||
        a.test(document.getElementById("profilefirstName").value) || ($("#errfn").css({
            display: "block",
            "margin-top": "10px"
        }), document.getElementById("errfn").innerHTML = "<font color='red' size='2'>First name should contain alphabates and space only</font>", e = !1);
    "" == document.getElementById("profilelastName").value || a.test(document.getElementById("profilelastName").value) || ($("#errln").css({
            display: "block",
            "margin-top": "10px"
        }), document.getElementById("errln").innerHTML = "<font color='red' size='2'>Last name should contain alphabates and space only</font>",
        e = !1);
    "" == document.getElementById("profileEmailID").value || d.test(document.getElementById("profileEmailID").value) || ($("#errEmail").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errEmail").innerHTML = "<font color='red' size='2'>Please enter a valid Email ID</font>", e = !1);
    "" != document.getElementById("profileMobileNumber").value && (10 < document.getElementById("profileMobileNumber").value.length || 10 > document.getElementById("profileMobileNumber").value.length || isNaN(document.getElementById("profileMobileNumber").value) ||
        b.test(document.getElementById("profileMobileNumber").value)) && ($("#errMob").css({
        display: "block",
        "padding-top": "40px"
    }), document.getElementById("errMob").innerHTML = "<font color='red' size='2'>Mobile number should contain 10 digit numbers only</font>", e = !1);
    var a = document.getElementById("dateOfBirth").selectedIndex,
        b = document.getElementById("monthOfBirth").selectedIndex,
        d = document.getElementById("yearOfBirth").selectedIndex,
        k = document.getElementById("dateOfBirth").value,
        f = document.getElementById("monthOfBirth").value,
        g = document.getElementById("yearOfBirth").value,
        h = document.getElementById("dateOfAnniversary").selectedIndex,
        l = document.getElementById("monthOfAnniversary").selectedIndex,
        m = document.getElementById("yearOfAnniversary").selectedIndex,
        p = document.getElementById("dateOfAnniversary").value,
        t = document.getElementById("monthOfAnniversary").value,
        q = document.getElementById("yearOfAnniversary").value,
        y = k + "/" + f + "/" + g,
        u = p + "/" + t + "/" + q,
        A = new Date(f + "/" + k + "/" + g),
        n = new Date(t + "/" + p + "/" + q),
        r = parseInt(g + f + k),
        z = parseInt(q +
            t + p),
        v = new Date,
        w = v.getDate(),
        x = v.getMonth() + 1,
        B = v.getFullYear();
    10 > w && (w = "0" + w);
    10 > x && (x = "0" + x);
    v = new Date(x + "/" + w + "/" + B);
    w = parseInt(B + "" + x + "" + w);
    if (0 < a || 0 < b || 0 < d) isNaN(k) || isNaN(f) || isNaN(g) ? ($("#errdobDay").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errdobDay").innerHTML = "<font color='red' size='2'>Please Enter Valid Date </font>", e = !1) : r > w ? ($("#errdobDay").css({
            display: "block",
            "margin-top": "10px"
        }), document.getElementById("errdobDay").innerHTML = "<font color='red' size='2'>Date of Birth cannot be Future Date</font>",
        e = !1) : c.test(y) ? c.test(y) && (document.getElementById("errdobDay").innerHTML = "<font display='none' size='2'></font>") : ($("#errdobDay").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errdobDay").innerHTML = "<font color='red' size='2'>Please Enter Valid Date </font>", e = !1);
    if (0 < h || 0 < l || 0 < m) isNaN(p) || isNaN(t) || isNaN(q) ? ($("#errdoaDay").css({
            display: "block",
            "margin-top": "10px"
        }), document.getElementById("errdoaDay").innerHTML = "<font color='red' size='2'>Please Enter Valid Date </font>",
        e = !1) : n > v ? (document.getElementById("errdoaDay").innerHTML = "<font color='red' size='2'>Date of Anniversary cannot be Future Date</font>", e = !1) : z > w ? ($("#errdoaDay").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errdoaDay").innerHTML = "<font color='red' size='2'>Date of Anniversary cannot be Future Date</font>", e = !1) : c.test(u) ? c.test(u) && (y == u ? ($("#errdata").css({
            display: "block",
            "margin-top": "10px"
        }), document.getElementById("errdata").innerHTML = "<font color='red' size='2'>Date of birth and Anniversary date cannot be same.</font>",
        e = !1) : A > n ? ($("#errdata").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errdata").innerHTML = "<font color='red' size='2'>Date of Birth cannot be after Anniversary Date.</font>", e = !1) : ($("#errdoaDay").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errdoaDay").innerHTML = "<font display='none' size='2'></font>", e = !0)) : ($("#errdoaDay").css({
            display: "block",
            "margin-top": "10px"
        }), document.getElementById("errdoaDay").innerHTML = "<font color='red' size='2'>Please Enter Valid Date </font>",
        e = !1);
    return e
}

function kpressfn() {
    document.getElementById("errfn").innerHTML = ""
}

function kpressln() {
    document.getElementById("errln").innerHTML = ""
}

function kpressmob() {
    document.getElementById("errMob").innerHTML = ""
}

function kpressemail() {
    document.getElementById("errEmail").innerHTML = ""
}

function selectBoxChange() {
    document.getElementById("errdobDay").innerHTML = "";
    document.getElementById("errdoaDay").innerHTML = "";
    document.getElementById("errdata").innerHTML = ""
}

function validateNickName() {
    var a = /^[a-zA-Z ]*$/;
    if ("" != document.getElementById("profilenickName").value && !a.test(document.getElementById("profilenickName").value)) return $("#errfn").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errnn").innerHTML = "<font color='red' size='2'>Nick name should contain alphabates and space only</font>", !1
}

function kpressnn() {
    document.getElementById("errnn").innerHTML = ""
}

function validatePassword() {
    var a = !0,
        b = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#^$%*&!^~]).{8,16}$/;
    if (null == document.getElementById("currentPassword").value || "" == document.getElementById("currentPassword").value) $("#errCurpwd").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errCurpwd").innerHTML = "<font color='red' size='2'>Please enter Current Password</font>", a = !1;
    if (null == document.getElementById("newPassword").value || "" == document.getElementById("newPassword").value) $("#errNewpwd").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errNewpwd").innerHTML = "<font color='red' size='2'><b>Please enter New Password</b></font>", a = !1;
    if (null == document.getElementById("checkNewPassword").value || "" == document.getElementById("checkNewPassword").value) $("#errCnfNewpwd").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errCnfNewpwd").innerHTML = "<font color='red' size='2'>Please Confirm New Password</font>", a = !1;
    else if (8 > document.getElementById("newPassword").value.length ||
        16 < document.getElementById("newPassword").value.length) $("#errNewpwd").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errNewpwd").innerHTML = "<font color='red' size='2'>Password should contain more than 8 and less than 16 characters</font>", a = !1;
    else if (b.test(document.getElementById("newPassword").value))
        if (document.getElementById("newPassword").value != document.getElementById("checkNewPassword").value) $("#errCnfNewpwd").css({
                display: "block",
                "margin-top": "10px"
            }), document.getElementById("errCnfNewpwd").innerHTML =
            "<font color='red' size='2'>Passwords do not match</font>", a = !1;
        else {
            var c = $("#currentPassword").val(),
                d = $("#newPassword").val(),
                d = encodeURIComponent(d);
            $("#newPassword").val(d);
            b = $("#checkNewPassword").val();
            b = encodeURIComponent(b);
            $("#checkNewPassword").val(b);
            b = encodeURIComponent(c);
            $("#currentPassword").val(b);
            jQuery.ajax({
                type: "POST",
                url: ACC.config.encodedContextPath + "/my-account/checkCurrentPassword",
                data: {
                    currentPassword: b
                },
                success: function(b) {
                    "invalidPassword" == b ? (document.getElementById("errCurpwd").innerHTML =
                        "<font color='red' size='2'>Oops! This password is incorrect.</font>", a = !1) : "validPassword" == b && (c == d ? (document.getElementById("errCurpwd").innerHTML = "<font color='red' size='2'>Current and New Password cannot be same</font>", a = !1) : (document.getElementById("errCurpwd").innerHTML = "", document.getElementById("errNewpwd").innerHTML = "", document.getElementById("errCnfNewpwd").innerHTML = "", chk = 0, $("#frmUpdatePassword").submit()))
                },
                error: function() {
                    globalErrorPopup("Something went wrong. Please try after sometime")
                }
            })
        }
    else $("#errNewpwd").css({
        display: "block",
        "margin-top": "10px"
    }), document.getElementById("errNewpwd").innerHTML = "<font color='red' size='2'>Please enter a valid password according to Password Policy (Password should meet the basic criteria of minimum 8 characters long up to 16 characters. Password should consist of atleast one alphabet, one numeric, one special symbols and Password doesn't consist of spaces and password should consists of atleast one UPPER and one LOWER case alphabet )</font>", a = !1;
    return a
}

function kpresscp() {
    document.getElementById("errCurpwd").innerHTML = ""
}

function kpressnp() {
    document.getElementById("errNewpwd").innerHTML = ""
}

function kpresscnp() {
    document.getElementById("errCnfNewpwd").innerHTML = ""
}

function reloadOrderPage() {
    window.location.href = ACC.config.encodedContextPath + "/my-account/orders"
}

function reloadOrderDetailPage() {
    var a = $("#newCode").val();
    window.location.href = ACC.config.encodedContextPath + "/my-account/order/?orderCode=" + a
}

function validateAccountAddress() {
    var a = document.getElementById("stateListBox").selectedIndex,
        b = /^[a-zA-Z ]*$/,
        c = /\s/,
        d = !0,
        e = !0,
        k = !0,
        f = !0,
        g = !0,
        h = !0,
        l = !0,
        m = !0,
        p = !0;
    0 == addressForm.addressRadioType[0].checked && 0 == addressForm.addressRadioType[1].checked && (document.getElementById("errtype").innerHTML = "<font color='red' size='2'>Please select an address type</font>", d = !1);
    null == addressForm.firstName.value || "" == addressForm.firstName.value ? ($("#erraddressfn").css({
            display: "block"
        }), document.getElementById("erraddressfn").innerHTML =
        "<font color='red' size='2'>Please enter first name</font>", d = !1) : b.test(document.getElementById("firstName").value) || ($("#errddressfn").css({
        display: "block"
    }), document.getElementById("erraddressfn").innerHTML = "<font color='red' size='2'>First name should contain alphabates and space only</font>", d = !1);
    null == addressForm.lastName.value || "" == addressForm.lastName.value ? ($("#errddressln").css({
            display: "block"
        }), document.getElementById("erraddressln").innerHTML = "<font color='red' size='2'>Please enter last name</font>",
        e = !1) : b.test(document.getElementById("lastName").value) || ($("#errddressln").css({
        display: "block"
    }), document.getElementById("erraddressln").innerHTML = "<font color='red' size='2'>Last name should contain alphabates and space only</font>", e = !1);
    if (null == addressForm.line1.value || "" == addressForm.line1.value) $("#errddressline1").css({
        display: "block"
    }), document.getElementById("erraddressline1").innerHTML = "<font color='red' size='2'>Please enter address line 1</font>", k = !1;
    if (null == addressForm.line2.value ||
        "" == addressForm.line2.value) $("#errddressline2").css({
        display: "block"
    }), document.getElementById("erraddressline2").innerHTML = "<font color='red' size='2'>Please enter address line 2</font>", f = !1;
    if (null == addressForm.line3.value || "" == addressForm.line3.value) $("#errddressline3").css({
        display: "block"
    }), document.getElementById("erraddressline3").innerHTML = "<font color='red' size='2'>Please enter landmark</font>", g = !1;
    if (null == addressForm.postcode.value || "" == addressForm.postcode.value) $("#errddressPost").css({
            display: "block"
        }),
        document.getElementById("erraddressPost").innerHTML = "<font color='red' size='2'>Please enter post code</font>", h = !1;
    else if (6 < addressForm.postcode.value.length || 6 > addressForm.postcode.value.length || isNaN(addressForm.postcode.value) || c.test(addressForm.postcode.value)) $("#errddressPost").css({
        display: "block"
    }), document.getElementById("erraddressPost").innerHTML = "<font color='red' size='2'>Post code should contain 6 digit numeric characters only</font>", h = !1;
    null == addressForm.townCity.value || "" == addressForm.townCity.value ?
        ($("#errddressCity").css({
            display: "block"
        }), document.getElementById("erraddressCity").innerHTML = "<font color='red' size='2'>Please enter city</font>", l = !1) : b.test(document.getElementById("townCity").value) || ($("#errddressCity").css({
            display: "block"
        }), document.getElementById("erraddressCity").innerHTML = "<font color='red' size='2'>City should contain alphabets only</font>", l = !1);
    0 == a && ($("#errddressState").css({
            display: "block"
        }), document.getElementById("erraddressState").innerHTML = "<font color='red' size='2'>Please select state</font>",
        m = !1);
    null == addressForm.mobileNo.value || "" == addressForm.mobileNo.value ? ($("#errddressMob").css({
        display: "block"
    }), document.getElementById("erraddressMob").innerHTML = "<font color='red' size='2'>Please enter mobile number</font>", p = !1) : 10 < addressForm.mobileNo.value.length || 10 > addressForm.mobileNo.value.length || isNaN(addressForm.mobileNo.value) ? ($("#errddressMob").css({
            display: "block"
        }), document.getElementById("erraddressMob").innerHTML = "<font color='red' size='2'>Mobile number should contain 10 digit numbers only</font>",
        p = !1) : c.test(addressForm.mobileNo.value) && ($("#errddressMob").css({
        display: "block"
    }), document.getElementById("erraddressMob").innerHTML = "<font color='red' size='2'>Mobile number should contain 10 digit numbers only</font>", p = !1);
    return d && e && k && f && g && h && l && m && p ? !0 : !1
}

function onSelectRadio() {
    document.getElementById("errtype").innerHTML = ""
}

function kpressaddressfn() {
    document.getElementById("erraddressfn").innerHTML = ""
}

function kpressaddressln() {
    document.getElementById("erraddressln").innerHTML = ""
}

function kpressaddressln1() {
    document.getElementById("erraddressline1").innerHTML = ""
}

function kpressaddressln2() {
    document.getElementById("erraddressline2").innerHTML = ""
}

function kpressaddressln3() {
    document.getElementById("erraddressline3").innerHTML = ""
}

function kpressaddresspost() {
    document.getElementById("erraddressPost").innerHTML = ""
}

function kpressaddresscity() {
    document.getElementById("erraddressCity").innerHTML = ""
}

function kpressaddressmob() {
    document.getElementById("erraddressMob").innerHTML = ""
}

function onAddressSelectValidate() {
    document.getElementById("erraddressState").innerHTML = ""
};
ACC.ratingstars = {
    _autoload: [
        ["bindRatingStars", 0 < $(".js-ratingCalc").length],
        ["bindRatingStarsSet", 0 < $(".js-ratingCalcSet").length]
    ],
    bindRatingStars: function() {
        $e = $(".js-ratingCalc");
        $e.each(function() {
            for (var a = $(this).data("rating"), b = $(this).find(".js-ratingIcon"), c, d = 1; d <= a.total; d++) {
                var e = b.clone().removeClass("js-ratingIcon");
                d <= a.rating && e.addClass("active");
                d - .5 == a.rating && (e.addClass("active fh"), c = b.clone().removeClass("ratingIcon"), c.addClass("lh"));
                e.insertBefore(b);
                c && (c.insertBefore(b),
                    c = null)
            }
            b.remove()
        })
    },
    bindRatingStarsSet: function() {
        $e = $(".js-ratingCalcSet");
        $e.on("mouseenter", ".js-rationIconSet", function(a) {
            a.preventDefault();
            $(this).parent().children().removeClass("active");
            a = $(this).index() + 1;
            $(this).parent().children(".js-rationIconSet:lt(" + a + ")").addClass("active")
        });
        $(document).on("mouseleave", ".js-ratingCalcSet", function(a) {
            a.preventDefault();
            $(this).find(".js-rationIconSet").removeClass("active");
            a = $(".js-ratingSetInput").val();
            $(this).find(".js-rationIconSet:lt(" + 2 *
                a + ")").addClass("active")
        });
        $e.on("click", ".js-rationIconSet", function(a) {
            a.preventDefault();
            a = $e.data("rating");
            var b = $(this).index() + 1;
            a.rating = b / 2;
            $(".js-ratingSetInput").val(a.rating)
        });
        $e.each(function() {
            for (var a = $(this).data("rating"), b = $(this).find(".js-ratingIcon"), c, d = 1; d <= a.total; d++) {
                var e = b.clone().removeClass("js-ratingIcon");
                e.addClass("fh");
                c = b.clone().removeClass("js-ratingIcon");
                c.addClass("lh");
                e.insertBefore(b);
                c && c.insertBefore(b)
            }
            b.remove()
        })
    }
};
ACC.tabs = {
    _autoload: [
        ["bindTabs", 0 < $(".js-tabs").length], "hideReviewBtn", "determineToDisplayReviews"
    ],
    bindTabs: function() {
        $e = $(".js-tabs");
        var a = $e.accessibleTabs({
            tabhead: ".tabhead",
            tabbody: ".tabbody",
            fx: "show",
            fxspeed: 0,
            currentClass: "active",
            autoAnchor: !0
        });
        $e.on("click", ".tabhead", function(a) {
            a.preventDefault();
            $(this).hasClass("active") ? $(this).removeClass("active") : ($(this).parents(".js-tabs").children(".tabs-list").find("a[href=#" + $(this).attr("id") + "]").click(), a = $(this).position().top, $("body,html").scrollTop(a))
        });
        $e.on("click", "#tabreview", function(a) {
            a.preventDefault();
            ACC.tabs.showReviewsAction("reviews")
        });
        $e.on("click", ".all-reviews-btn", function(a) {
            a.preventDefault();
            ACC.tabs.showReviewsAction("allreviews");
            ACC.tabs.hideReviewBtn(".all-reviews-btn");
            ACC.tabs.showReviewBtn(".less-reviews-btn")
        });
        $e.on("click", ".less-reviews-btn", function(a) {
            a.preventDefault();
            ACC.tabs.showReviewsAction("reviews");
            ACC.tabs.hideReviewBtn(".less-reviews-btn");
            ACC.tabs.showReviewBtn(".all-reviews-btn")
        });
        $(document).on("click",
            ".js-writeReviewTab",
            function(b) {
                b.preventDefault();
                a.showAccessibleTabSelector($(this).attr("href"));
                $(".js-review-write").show();
                $("#reviewForm input[name=headline]").focus()
            });
        $(document).on("click", ".js-review-write-toggle", function(a) {
            a.preventDefault();
            1 > $(".js-review-write:visible").length ? $(".js-review-write").show() : $(".js-review-write").hide()
        });
        $(document).on("click", ".js-openTab", function() {
            a.showAccessibleTabSelector($(this).attr("href"))
        })
    },
    showReviewsAction: function(a) {
        $.get($("#reviews").data(a),
            function(a) {
                $("#reviews").html(a);
                0 < $(".js-ratingCalc").length && (ACC.ratingstars.bindRatingStars(), ACC.tabs.showingAllReviews())
            })
    },
    hideReviewBtn: function(a) {
        $(void 0 == a ? ".less-reviews-btn" : a).hide()
    },
    showReviewBtn: function(a) {
        $(a).show()
    },
    showingAllReviews: function() {
        $("#showingAllReviews").data("showingallreviews") && ACC.tabs.hideReviewBtn(".all-reviews-btn")
    },
    determineToDisplayReviews: function() {
        "#tabreview" == location.hash && ACC.tabs.showReviewsAction("reviews")
    }
};
ACC.comparenow = {
    _autoload: ["bindCompareNow"],
    bindCompareNow: function() {
        0 < $("#compareProducts .compare-item").length && ($("#compareSection").show(), $(".compare-item").each(function() {
            var a = $(this).attr("id").substring(10);
            $("#" + a).prop("checked", !0);
            $("#compare" + a).html("Compare Now")
        }));
        var a = [];
        $(".compare input[type=checkbox]").click(function() {
            var b = $(this).attr("id");
            1 == $(this).prop("checked") ? $.ajax({
                type: "GET",
                dataType: "json",
                url: ACC.config.encodedContextPath + "/compare/add/?productCode=" + b,
                success: function(b) {
                    setTimeout(function() {
                            $("#compareError").empty()
                        },
                        3E3);
                    $("#compareProducts").empty();
                    $("#compareSection").show();
                    var d = 0,
                        e = [];
                    $.each(b, function(a, b) {
                        console.log(b.productPriceSpecial);
                        d++;
                        var c = "<div class='compare-item' id='compare-id" + b.productCode + "'><img src='" + b.productImageUrl + "'/><ul class='content'><li>" + b.brand + "</li><li>" + b.productName + "</li>",
                            c = b.productPrice != b.productPriceSpecial ? c + ("<li><p class='old'>" + b.productPrice + "<p></li><li><p class='sale'>" + b.productPriceSpecial + "</p></li><br/>") : c + ("<li>" + b.productPrice + "</li><br/>"),
                            c = c + ("<li><a id='" +
                                b.productCode + "'class='compareRemoveLink'>Remove</li></ul></div>");
                        $("#compareProducts").append(c);
                        e.push(b.productCode)
                    });
                    for (index = 0; index < a.length; ++index) - 1 == e.indexOf(a[index]) && ($("input:checkbox[id=" + a[index] + "]").prop("checked", !1), $("#compare" + a[index]).html("Add to compare"), $("#compareError").html("Sorry! We can only compare similar products."));
                    1 < d ? ($("#compareBtn").removeClass("disabled"), $("#compareBtn").addClass("enabled"), $("#compareBtn").removeAttr("disabled")) : ($("#compareBtn").attr("disabled",
                        "disabled"), $("#compareBtn").removeClass("enabled"), $("#compareBtn").addClass("disabled"))
                },
                error: function() {
                    globalErrorPopup("Sorry we are unable to add your product to compare. Please try after sometime")
                }
            }) : $.ajax({
                type: "GET",
                dataType: "json",
                url: ACC.config.encodedContextPath + "/compare/remove/?productCode=" + b,
                success: function(a) {
                    $("#compare-id" + b).remove();
                    $("input:checkbox[id=" + b + "]").prop("checked", !1);
                    $("#compare" + b).html("Add to Compare");
                    var d = 0;
                    $(".compare input[type=checkbox]").each(function() {
                        $(this).is(":checked") &&
                            d++
                    });
                    1 >= d && ($("#compareBtn").attr("disabled", "disabled"), $("#compareBtn").removeClass("enabled"), $("#compareBtn").addClass("disabled"));
                    0 == $("#compareProducts .compare-item").length && $("#compareSection").hide()
                },
                error: function() {
                    globalErrorPopup("Sorry we are unable to add your product to compare. Please try after sometime")
                }
            });
            $(".compare input[type=checkbox]").each(function() {
                var b = "#" + $(this).attr("id");
                if ($(b).is(":checked")) {
                    var b = $(this).attr("id"),
                        d = "#compare" + b;
                    $(d).html("Compare Now");
                    d = !1;
                    for (index = 0; index < a.length; ++index) b == a[index] && (d = !0);
                    d || (4 > a.length ? a.push(b) : ($("#compareError").html("You can add maximum 4 products to compare"), $(this).prop("checked", !1)))
                } else
                    for (b = $(this).attr("id"), d = "#compare" + b, $(d).html("Add to compare"), index = 0; index < a.length; ++index) b == a[index] && a.splice($.inArray(b, a), 1)
            })
        });
        if (790 < $(window).resize().width()) $(window).on("scroll", function() {
            $(".comparison-table .short-info,.wrapper.compare ").length && ($(window).scrollTop() > $(".comparison-table .short-info").offset().top -
                $("header .bottom.active").height() && ($(".comparison-table.stats").first().css("margin-top", $(".comparison-table.products-compareTable").height() + $("header .bottom.active").height()), $(".comparison-table").first().addClass("active")), $(window).scrollTop() < $(".wrapper.compare").offset().top - 10 - $("header .bottom.active").height() - $(".comparison-table.active").height() && ($(".comparison-table.stats").first().css("margin-top", "0px"), $(".comparison-table").first().removeClass("active")), $(".comparison-table.active").css({
                    width: $(".comparison-table.stats").width()
                }))
        });
        $(window).on("load resize", function() {
            $(".comparison-table.active").css({
                width: $(".comparison-table.stats").width()
            })
        });
        $(".compareBtn").click(function() {
            window.location.href = ACC.config.encodedContextPath + "/compare"
        });
        $(".closeLink").click(function() {
            $("#compareSection").hide();
            $(".compare input[type=checkbox]").each(function() {
                if ($(this).is(":checked")) {
                    $(this).prop("checked", !1);
                    var a = $(this).attr("id");
                    $("#compare" + a).html("Add to compare")
                }
            });
            $.ajax({
                type: "GET",
                dataType: "json",
                url: ACC.config.encodedContextPath +
                    "/compare/removeAll",
                success: function(a) {},
                error: function() {
                    globalErrorPopup("Sorry we are unable to add your product to compare. Please try after sometime")
                }
            })
        });
        $(document).on("click", ".compareRemoveLink", function() {
            $("#compareError").empty();
            var a = $(this).attr("id");
            $.ajax({
                type: "GET",
                dataType: "json",
                url: ACC.config.encodedContextPath + "/compare/remove/?productCode=" + a,
                success: function(c) {
                    $("#compare-id" + a).remove();
                    $("input:checkbox[id=" + a + "]").prop("checked", !1);
                    $("#compare" + a).html("Add to Compare");
                    var d = 0;
                    $(".compare input[type=checkbox]").each(function() {
                        $(this).is(":checked") && d++
                    });
                    1 >= d && ($("#compareBtn").attr("disabled", "disabled"), $("#compareBtn").removeClass("enabled"), $("#compareBtn").addClass("disabled"));
                    0 == $("#compareProducts .compare-item").length && $("#compareSection").hide()
                },
                error: function() {
                    globalErrorPopup("Sorry we are unable to add your product to compare. Please try after sometime")
                }
            })
        })
    }
};

function validateEmail() {
    var a = document.getElementById("emailField");
    if (/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(a.value)) return $("#invalidEmail").hide(), !0
}

function validateEmailOnSubmit() {
    var a = document.getElementById("emailField");
    if (0 >= a.value.trim().length) return $("#invalidEmail").show(), !1;
    if (/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(a.value)) return !0;
    $("#invalidEmail").show();
    return !1
}

function validateFeedback() {
    if (0 < document.getElementById("commentNO").value.trim().length) return $("#invalidFeedback").hide(), !0
}

function validateFeedbackOnSubmit() {
    return 0 >= document.getElementById("commentNO").value.trim().length ? ($("#invalidFeedback").show(), !1) : !0
}

function authentic() {
    for (var a = $(".page-authenticAndExclusive ul.feature-brands li"), b = 0; b < a.length; b += 3) {
        var c, d, e;
        c = parseInt(a.eq(b).find(".image").css("height")) + parseInt(a.eq(b).find(".logo").css("height")) + parseInt(a.eq(b).find(".logo").css("margin-bottom")) + parseInt(a.eq(b).find(".logo").css("margin-top")) + parseInt(a.eq(b).find("span").css("height"));
        d = parseInt(a.eq(b + 1).find(".image").css("height")) + parseInt(a.eq(b + 1).find(".logo").css("height")) + parseInt(a.eq(b + 1).find(".logo").css("margin-bottom")) +
            parseInt(a.eq(b + 1).find(".logo").css("margin-top")) + parseInt(a.eq(b + 1).find("span").css("height"));
        e = parseInt(a.eq(b + 2).find(".image").css("height")) + parseInt(a.eq(b + 2).find(".logo").css("height")) + parseInt(a.eq(b + 2).find(".logo").css("margin-bottom")) + parseInt(a.eq(b + 2).find(".logo").css("margin-top")) + parseInt(a.eq(b + 2).find("span").css("height"));
        c = c > d && c > e ? c : d > c && d > e ? d : e;
        a.eq(b).css("min-height", c);
        a.eq(b + 1).css("min-height", c);
        a.eq(b + 2).css("min-height", c)
    }
}

function atoz_listing() {
    $(".brands-page").find("ul .desktop ul.list_custom li").removeClass("columns-4-mobile");
    var a;
    $(".brands-page").find("ul .desktop ul.list_custom li").each(function() {
        a = $(this).find("a").length;
        6 >= a ? $(this).addClass("columns-1") : 6 < a && 12 >= a ? $(this).addClass("columns-2") : 12 < a && 18 >= a ? $(this).addClass("columns-3") : $(this).addClass("columns-4")
    })
}
$(document).ready(function() {
    function a() {
        $(".benefits ul li").each(function(a) {
            var b = ($(".sign-in .tabs li.active").height() + 20) / 3,
                c = $(".benefits ul li").eq(a).find("div:last-child").height();
            console.log("active" + b);
            $(".benefits ul li").eq(a).css({
                height: b + 1,
                padding: (b - c) / 2 + "px 20px"
            })
        })
    }
    $(".facet.js-facet .js-facet-name").each(function() {
        $(this).html();
        "" == $.trim($(this).html()) && $(this).parent().hide()
    });
    $(document).keydown(function(a) {
        27 == a.which && $(".modal").modal("hide")
    });
    var b = null;
    $("body").hasClass("page-multiStepCheckoutSummaryPage") ||
        $("body").hasClass("page-checkout-login") || (0 == $(window).scrollTop() && window.setTimeout(function() {
            b = "display:block;width: " + $("#js-site-search-input").css("width") + "; left: " + $("#js-site-search-input").offset().left + "px";
            $("#ui-id-1").attr("style", b)
        }, 100), b = "display:block;width: " + $("#js-site-search-input").css("width") + "; left: " + $("#js-site-search-input").offset().left + "px");
    $("ul#ui-id-1").attr("style", b);
    $("#js-site-search-input").keypress(function() {
        $("#js-site-search-input").parents("form#search_form").next(".ui-autocomplete.ui-front.links.ui-menu").css("border",
            "1px solid #dfd1d5")
    });
    $("body").hasClass("template-pages-layout-micrositePage1") && ($(window).scroll(function() {
            $(".ui-autocomplete").is(":visible") && window.setTimeout(function() {
                $("#js-site-micrositesearch-input").parents("form#search_form_microsite").next(".ui-autocomplete.ui-front.links.ui-menu").css({
                    left: $("#js-site-micrositesearch-input").offset().left,
                    width: $("#js-site-micrositesearch-input").outerWidth()
                })
            }, 300);
            0 < $(window).scrollTop() && $("#js-site-search-input").parents("form#search_form").next(".ui-autocomplete.ui-front.links.ui-menu").hide()
        }),
        $("#js-site-micrositesearch-input").keydown(function() {
            $("#js-site-micrositesearch-input").parents("form#search_form_microsite").next(".ui-autocomplete.ui-front.links.ui-menu").css({
                left: $("#js-site-micrositesearch-input").offset().left,
                width: $("#js-site-micrositesearch-input").outerWidth()
            })
        }));
    $("a.stockLevelStatus").parents("div.image").find("a.thumb img").addClass("out-of-stock-product");
    $(".js-mini-cart-count").text();
    $(".js-mini-cart-count-hover").text($(".js-mini-cart-count").text());
    $(window).scroll(function() {
        $("body").hasClass("page-multiStepCheckoutSummaryPage") ||
            $("body").hasClass("page-checkout-login") || ($(window).scrollTop() > $(".bottom").offset().top && !$(".bottom").hasClass("active") ? $(".bottom").addClass("active") : 0 == $(window).scrollTop() && $(".bottom").removeClass("active"))
    });
    var c = document.getElementById("searchCategory");
    if (null != c && "undefined" != c && 0 <= c.selectedIndex) {
        var c = c.options[c.selectedIndex].text,
            d = $("div.results").text(),
            e = d.indexOf("f"),
            d = d.slice(e + 4),
            d = d.substr(d.indexOf('"') + 1);
        d.slice(0, d.indexOf('"'));
        d = $("#text").val();
        $("#searchCategoryhidden").val(c);
        $("#searchText").val(d)
    }
    $(".saved-cards .number paymentItem .view-details").click(function() {
        $(this).parent().hasClass("active") ? $(".saved-cards .number.paymentItem").removeClass("active") : $(".saved-cards .number.paymentItem").addClass("active")
    });
    $(".select-list ul li").on("click", function() {
        $(".selected-dropdownText").text($(this).text())
    });
    $(".facet-name.js-facet-name h4").on("click", function() {
        $(this).hasClass("active") ? ($(this).removeClass("active"), $(this).parent().siblings(".facet-values.js-facet-values.js-facet-form").hide(100),
            $(this).siblings(".brandSelectAllMain").hide(100), $(this).parent().siblings("#searchPageDeptHierTreeForm").find("#searchPageDeptHierTree").hide(100), $(this).parent().siblings("#categoryPageDeptHierTreeForm").find("#categoryPageDeptHierTree").hide(100)) : ($(this).addClass("active"), $(this).parent().siblings(".facet-values.js-facet-values.js-facet-form").show(100), $(this).siblings(".brandSelectAllMain").show(100), $(this).parent().siblings("#searchPageDeptHierTreeForm").find("#searchPageDeptHierTree").show(100),
            $(this).parent().siblings("#categoryPageDeptHierTreeForm").find("#categoryPageDeptHierTree").show(100))
    });
    $(".toggle-filterSerp").click(function() {
        $(".product-facet.js-product-facet.listing-leftmenu").slideToggle();
        $(this).toggleClass("active");
        $(".facet-name.js-facet-name h4").toggleClass("active");
        $(".product-facet.js-product-facet.listing-leftmenu").find(".facet-list.js-facet-list").removeClass("active");
        $(".product-facet.js-product-facet.listing-leftmenu").find("div#searchPageDeptHierTree").hide()
    });
    $(".product-facet .facet-list li input.applied-color").each(function() {
        var a = $(this).attr("value");
        $(".product-facet li.filter-colour a").each(function() {
            var b = $(this).attr("title");
            a == b && $(this).parent().addClass("active")
        })
    });
    $(".lookbook-text").each(function() {
        0 == $(this).children().length && $(this).parent().css("margin-bottom", "0px")
    });
    $(".electronics-brand .feature-brands").each(function() {
        0 == $(this).children().length && $(this).parents(".brands").hide()
    });
    $(".apparel-brand .feature-brands").each(function() {
        0 ==
            $(this).children().length && $(this).parents(".brands").hide()
    });
    $(".toggle").on("click", function(a) {
        a = $(a.currentTarget).parent();
        a.hasClass("active") ? a.removeClass("active") : a.addClass("active");
        773 > $(window).width() ? ($("span#mobile-menu-toggle").unbind("click"), $("span#mobile-menu-toggle").click(function() {
            $(this).parent("li").siblings().find("#mobile-menu-toggle").removeClass("menu-dropdown-arrow");
            $(this).parent("li").siblings().find("#mobile-menu-toggle + ul").slideUp();
            $(this).next().slideToggle();
            $(this).toggleClass("menu-dropdown-arrow")
        }), $("li.short.words").siblings("li.long.words").hide(), $("li.short.words").unbind("click"), $("li.short.words").click(function() {
            $(this).toggleClass("active");
            $(this).nextAll().each(function() {
                if ($(this).hasClass("short")) return !1;
                $(this).toggle(200)
            })
        })) : ($("#mobile-menu-toggle").next().attr("style", null), $("li.short.words,li.long.words").next().attr("style", null))
    });
    $("footer h3.toggle").click(function(a) {
        790 < $(window).width() && $(a.currentTarget).parent().removeClass("active")
    });
    $(window).on("load resize", function() {
        790 < $(window).width() && $("footer h3.toggle").parent().removeClass("active")
    });
    $(".close").on("click", function(a) {
        $(a.currentTarget).closest(".banner").removeClass("active")
    });
    $(".toggle a").on("click", function(a) {
        a.stopPropagation();
        var b = $(a.currentTarget).parent().parent();
        b.hasClass("active") ? window.location.href = $(a.currentTarget).attr("href") : b.addClass("active")
    });
    $("#signIn_link").on("click", function(a) {
        $(this).addClass("active");
        $("#SignUp_link,#sign_up_content").removeClass("active");
        $("#sign_in_content").addClass("active")
    });
    $("#SignUp_link").on("click", function(a) {
        $(this).addClass("active");
        $("#signIn_link, #sign_in_content").removeClass("active");
        $("#sign_up_content").addClass("active")
    });
    $(".tabs-block .nav.pdp li").on("click", function(a) {
        $("ul.nav.pdp li").removeClass("active");
        $(this).addClass("active");
        a = $(this).index();
        $("ul.tabs.pdp>li").removeClass("active");
        $("ul.tabs.pdp>li").eq(a).addClass("active")
    });
    $(".range").hide();
    $(".range.current").show();
    c = $(".range.current").attr("id");
    $("[data-tab=" + c + "]").css({
        "border-bottom": "3px solid",
        "font-weight": "bold"
    });
    $("nav>ul>li>ul>li>.toggle").hover(function() {
        $(".range").removeClass("current");
        $("#A-E").addClass("current");
        $(".range").hide();
        $(".range.current").show();
        var a = $(".range.current").attr("id");
        $(".brandGroupLink").css({
            "border-bottom": "none",
            "font-weight": "400"
        });
        $("[data-tab=" + a + "]").css({
            "border-bottom": "3px solid",
            "font-weight": "bold"
        })
    });
    var k = $("#viewPaymentCredit, #viewPaymentDebit, #viewPaymentNetbanking, #viewPaymentCOD, #viewPaymentEMI");
    $(window).on("load resize", function() {
        k.on("click", function(a) {
            651 > $(window).width() && ($(".cart.wrapper .left-block .payments.tab-view ul.tabs").show(200), $(this).parents("ul.nav").addClass("hide-menu"), $(this).parents(".left-block").find("h1.payment-options").addClass("hide-menu"));
            k.parent().hasClass("active") && k.parent().removeClass("active");
            $(this).parent().addClass("active");
            $("ul.accepted-cards li").removeClass("active-card")
        });
        $(".cart.wrapper .left-block .payments.tab-view .tabs li.change-payment").click(function() {
            $(this).parent().hide(200);
            $(this).parent().siblings("ul.nav").removeClass("hide-menu");
            $(this).parents(".left-block").find("h1.payment-options").removeClass("hide-menu")
        })
    });
    "block" === $("#savedCard").css("display") && $(".newCardPayment").css("display", "none");
    $("body>div").hasClass("brand-microsite") && ($(this).find("header").first().addClass("compact"), $(this).find("header").first().find(".compact-toggle").click(function() {
        $(this).parents("header").toggleClass("compact");
        $(this).parents("header").find(".compact-toggle").toggleClass("open")
    }));
    $(document).ready(function() {
        $("#radioInterest1").is(":checked") && $("#radioInterest1").click()
    });
    $("#radioInterest1").click(function() {
        $("body .account.preferences .right-account form fieldset span input").prop("disabled", "true");
        $("body .account.preferences .right-account form fieldset span label").css({
            opacity: "0.5",
            cursor: "not-allowed"
        });
        $("body .account.preferences .right-account form fieldset .mplPref-category input").prop("disabled", "true");
        $("body .account.preferences .right-account form fieldset .mplPref-category label").css({
            opacity: "0.5",
            cursor: "not-allowed"
        });
        $("body .account.preferences .right-account form fieldset .freq input").prop("disabled", "true");
        $("body .account.preferences .right-account form fieldset .freq label").css({
            opacity: "0.5",
            cursor: "not-allowed"
        });
        $("body .account.preferences .right-account form fieldset input").prop("disabled", "true");
        $("body .account.preferences .right-account form fieldset label").css({
            opacity: "0.5",
            cursor: "not-allowed"
        });
        $("body .account.preferences .right-account form .button-set a,body .account.preferences .right-account form .button-set a:hover").css({
            color: "#000",
            opacity: "0.5",
            cursor: "not-allowed"
        });
        $("body .account.preferences .right-account form .button-set a").prop("disabled", "true")
    });
    $("#radioInterest0").click(function() {
        $("body .account.preferences .right-account form fieldset .mplPref-category input").removeAttr("disabled");
        $("body .account.preferences .right-account form fieldset .mplPref-category label").attr("style", null);
        $("body .account.preferences .right-account form fieldset .freq input").removeAttr("disabled");
        $("body .account.preferences .right-account form fieldset .freq label").attr("style",
            null);
        $("body .account.preferences .right-account form fieldset input").removeAttr("disabled");
        $("body .account.preferences .right-account form fieldset label").attr("style", null);
        $("body .account.preferences .right-account form fieldset span input").removeAttr("disabled");
        $("body .account.preferences .right-account form fieldset span label").attr("style", null);
        $("body .account.preferences .right-account form .button-set a").removeAttr("disabled");
        $("body .account.preferences .right-account form .button-set a,body .account.preferences .right-account form .button-set a:hover").attr("style",
            null)
    });
    $("#unsubcribe-link").click(function(a) {
        "disabled" == $("#unsubcribe-link").attr("disabled") && a.preventDefault()
    });
    $("body form.questionnaire-form").parents().find(".breadcrumbs.wrapper").css("display", "none");
    $("body form.questionnaire-form").parents().find("header").addClass("compact");
    $("body div.marketplace-mystyle").find(".breadcrumbs.wrapper").css("display", "none");
    $("body div.marketplace-mystyle").find("header").addClass("compact");
    $("body form.questionnaire-form").parents().find("header").find(".compact-toggle").click(function() {
        $(this).parents("header").toggleClass("compact");
        $(this).parents("header").find(".compact-toggle").toggleClass("open")
    });
    $("body div.marketplace-mystyle").find("header").find(".compact-toggle").click(function() {
        $(this).parents("header").toggleClass("compact");
        $(this).parents("header").find(".compact-toggle").toggleClass("open")
    });
    $("#question-0-0,#question-0-1").click(function() {
        $(this).parents(".gender").removeClass("active").siblings(".products").addClass("active")
    });
    $(".questionnaire-form fieldset .buttons .next").click(function() {
        $(this).parents("fieldset").removeClass("active").next().addClass("active")
    });
    $(".questionnaire-form fieldset .buttons .prev").click(function() {
        $(this).parents("fieldset").removeClass("active").prev().addClass("active")
    });
    790 >= $(window).resize().width() && (c = "#subcategory-" + $(".brandCategory").eq(0).attr("id"), $(c).show());
    $(".cmsBrands").each(function() {
        0 == $(this).find(".list_custom li").length && $(this).find(".nav-wrapper").hide()
    });
    $(".subBrands").each(function() {
        0 == $(this).find(".list_custom li").length && $(this).find(".nav-wrapper").hide()
    });
    $(".cmsMultiBrands").each(function() {
        0 ==
            $(this).find(".list_custom li").length && $(this).find(".nav-wrapper").hide()
    });
    $('select[name="test"]').change(function() {
        if ($(this).find(".brandCategory").is(":selected")) {
            var a = document.getElementById("mySelect").selectedIndex,
                b = document.getElementById("mySelect").options,
                a = b[a].index;
            $(".cmsBrands").hide();
            $(".subBrands").hide();
            $(".cmsMultiBrands").hide();
            b = "#subcategory-" + $(this).find(".brandCategory").eq(a).attr("id");
            $(b).show();
            0 == $(b).find(".list_custom li").length && $(b).find(".nav-wrapper").hide()
        }
        $(this).find(".cmsManagedBrands").is(":selected") &&
            (a = document.getElementById("mySelect").selectedIndex, b = document.getElementById("mySelect").options, a = b[a].index, b = $(".brands-page .brands-left #mySelect .brandCategory").length, a -= b, $(".cmsBrands").hide(), $(".subBrands").hide(), $(".cmsMultiBrands").hide(), b = "#cmsManaged-" + $(this).find(".cmsManagedBrands").eq(a).attr("id"), a = "#cmsMultiManaged-" + $(this).find(".cmsManagedBrands").eq(a).attr("id"), $(b).show(), $(a).show(), 0 == $(b).find(".list_custom li").length && $(b).find(".nav-wrapper").hide(), 0 == $(a).find(".list_custom li").length &&
                $(a).find(".nav-wrapper").hide());
        var c = $(this).children(":selected").attr("id");
        $(".brands-page .brands-left ul > li").removeClass("active");
        $(".brands-page .brands-left ul > li>a").filter(function() {
            return this.id === c
        }).parent("li").addClass("active")
    });
    $(".cmsBrands").hide();
    $(".cmsMultiBrands").hide();
    $(".brandCategory").click(function() {
        $(".cmsBrands").hide();
        $(".subBrands").hide();
        $(".cmsMultiBrands").hide();
        var a = "#subcategory-" + $(this).attr("id"),
            b = $(this).attr("id");
        $("#mySelect option").filter(function() {
            return this.id ===
                b
        }).prop("selected", !0);
        $(a).show()
    });
    $(".cmsManagedBrands").click(function() {
        $(".cmsBrands").hide();
        $(".subBrands").hide();
        $(".cmsMultiBrands").hide();
        var a = "#cmsManaged-" + $(this).attr("id"),
            b = "#cmsMultiManaged-" + $(this).attr("id"),
            c = $(this).attr("id");
        $("#mySelect option").filter(function() {
            return this.id === c
        }).prop("selected", !0);
        $(b).show();
        $(a).show()
    });
    $(".saved-cards .number .view-details").click(function(a) {
        $(a.currentTarget).parent().hasClass("active") ? $(this).parent().removeClass("active") :
            $(this).parent().addClass("active")
    });
    atoz_listing();
    $(".brands-page .list_custom li span.letter").each(function() {
        47 < $(this).text().toUpperCase().charCodeAt(0) && 58 > $(this).text().toUpperCase().charCodeAt(0) || 64 < $(this).text().toUpperCase().charCodeAt(0) && 72 > $(this).text().toUpperCase().charCodeAt(0) ? $(this).addClass("a-g-set") : 71 < $(this).text().toUpperCase().charCodeAt(0) && 79 > $(this).text().toUpperCase().charCodeAt(0) ? $(this).addClass("h-n-set") : 78 < $(this).text().toUpperCase().charCodeAt(0) && 86 >
            $(this).text().toUpperCase().charCodeAt(0) ? $(this).addClass("o-u-set") : $(this).addClass("v-z-set")
    });
    $(".brands-page .list_custom li").hide();
    $(".brands-page .list_custom li span.letter.a-g-set").parent().show();
    $(".brandCategory").click(function() {
        var a = $(this).attr("id");
        window.history.pushState("obj", "newtitle", "/store/mpl/en/brands/brandlist?cat=" + a)
    });
    $(".cmsManagedBrands").click(function() {
        var a = $(this).attr("id");
        window.history.pushState("obj", "newtitle", "/store/mpl/en/brands/brandlist?cat=" +
            a)
    });
    $(".brands-page .desktop ul.nav > li").click(function() {
        $(".brands-page .desktop ul.nav > li").removeClass("active");
        $(this).addClass("active");
        var a = $(this).attr("id"),
            b = ".brands-page .desktop ul.nav > li#" + a,
            a = ".brands-page .list_custom li span.letter." + a;
        $(".brands-page .list_custom li").hide();
        $(a).parent().show();
        $(b).addClass("active");
        $("body,html").animate({
            scrollTop: $(this).parents(".desktop").offset().top
        }, "slow")
    });
    $(".brands-page .brands-left ul > li").click(function() {
        $(".brands-page .brands-left ul > li").removeClass("active");
        $(this).addClass("active")
    });
    $(".sign-in .nav li, #sign_in_content .button_fwd_wrapper button, #sign_up_content .form-actions button").click(function() {
        a()
    });
    $(window).on("load resize", function() {
        790 <= $(window).width() && a()
    });
    790 > $(window).width() && $("header .content .top .toggle").click(function() {
        $(this).parent().hasClass("active") ? ($(this).parent().siblings(".overlay").addClass("overlay-sideNav"), $("body").css("overflow", "hidden")) : ($(this).parent().siblings(".overlay").removeClass("overlay-sideNav"),
            $("body").css("overflow", "auto"))
    });
    $(".js-rename-wishlist").click(function() {
        $(".rename-wishlist-container").hide();
        $(this).prev(".rename-wishlist-container").toggle();
        $(".js-rename-wishlist").show();
        $(".wishlist-name").show();
        $(this).toggle();
        $(this).siblings(".wishlist-name").toggle()
    });
    $(".modal").click(function(a) {
        $(a.target).hasClass("js-rename-wishlist") || $(a.target).hasClass("rename_link") || $(a.target).hasClass("rename-input") || ($(".rename-wishlist-container").hide(), $(".js-rename-wishlist").show(),
            $(".wishlist-name").show())
    });
    0 < $("body").find("a.wishlist#wishlist").length && $("a.wishlist#wishlist").popover({
        html: !0,
        content: function() {
            return $(this).parents().find(".add-to-wishlist-container").html()
        }
    });
    0 < $("body").find("input.wishlist#add_to_wishlist").length && $("input.wishlist#add_to_wishlist").popover({
        html: !0,
        content: function() {
            return $(this).parents().find(".add-to-wishlist-container").html()
        }
    });
    0 < $("body").find("a.cart_move_wishlist").length && $("a.cart_move_wishlist").popover({
        html: !0,
        content: function() {
            return $(".add-to-wishlist-container").html()
        }
    });
    0 < $("body").find("ul.wish-share a.mailproduct").length && $("ul.wish-share a.mailproduct").popover({
        html: !0,
        content: function() {
            return "true" == $("#loggedIn").val() ? $(this).parents().find("#emailSend").html() : '<div style="padding: 10px;">' + $(this).parents().find("#emailLoggedInId").html() + "</div>"
        }
    });
    $("ul.wish-share div.share").mouseleave(function() {
        $(this).find('[data-toggle="popover"]').popover("hide")
    });
    $("body").on("click", function(a) {
        $('[data-toggle="popover"]').each(function() {
            $(this).is(a.target) ||
                0 !== $(this).has(a.target).length || 0 !== $(".popover").has(a.target).length || $(this).popover("hide")
        })
    });
    $(".create-newlist-link").click(function() {
        $("header .content .top").toggleClass("no-z-index")
    });
    $("#createNewList").find("div.overlay").click(function() {
        $("header .content .top").removeClass("no-z-index")
    });
    $("#createNewList").find("a.close").click(function() {
        $("header .content .top").removeClass("no-z-index")
    });
    $("#createNewList").find("button.close").click(function() {
        $("header .content .top").removeClass("no-z-index")
    });
    0 < window.navigator.userAgent.indexOf("MSIE ") && $("iframe").each(function() {
        var a = $(this).attr("src");
        $(this).attr("src", a + "?wmode=transparent")
    });
    $(".checkout-shipping #addressForm input[type='checkbox']").change(function() {
        !0 === $(this).prop("checked") ? ($(this).parent().css("color", "#a9143c"), $(this).parent().addClass("checkbox-checked")) : ($(this).parent().css("color", "#666"), $(this).parent().removeClass("checkbox-checked"))
    });
    c = $(".products-compareTable").find("td").length;
    0 == c % 3 ? $(".products-compareTable tr td ,.comparison-table.stats tbody tr td ").css({
            width: "33.3%"
        }) :
        0 == c % 2 && 0 == c % 4 ? $(".products-compareTable tr td ,.comparison-table.stats tbody tr td ").css({
            width: "25%"
        }) : 0 == c % 5 && $(".products-compareTable tr td ,.comparison-table.stats tbody tr td ").css({
            width: "20%"
        });
    var f = ACC.config.contextPath;
    $("input[name=yes]").click(function() {
        $(".search-feedback").hide();
        $(".feed-back-categories").hide();
        $(".feed-back").hide();
        $(".feed-back-form").fadeIn()
    });
    $("input[name=no]").click(function() {
        $(".search-feedback").hide();
        $(".feed-back-form").hide();
        $(".feed-back-categories").show();
        $.ajax({
            url: f + "/feedback/searchcategotylist",
            type: "GET",
            returnType: "JSON",
            success: function(a) {
                listSelect = "";
                console.log(a);
                $.each(a, function(a, b) {
                    listSelect += '<option value="' + b + '">' + b + "</option>"
                });
                console.log(listSelect);
                $("#feedCategory").html(listSelect);
                $(".feed-back").show()
            },
            fail: function(a) {
                alert("Failed to load categories")
            }
        })
    });
    $("#feedCategory").change(function() {
        $(".feed-back").show()
    });
    $("input[name=submitFeedBackYes]").click(function() {
        var a = $("#feedBackFormYes").serialize();
        $.ajax({
            url: f +
                "/feedback/feedbackyes",
            type: "GET",
            returnType: "text",
            data: a,
            success: function(a) {
                "SUCCESS" == a && (alert("Thanks For your FeedBack"), $(".feed-back-categories").hide(), $(".feed-back").hide(), $(".feedback-thankyou").fadeIn())
            },
            fail: function(a) {
                alert("Failed to load categories")
            }
        })
    });
    $("input[name=submitFeedBackNo]").click(function() {
        var a = $("#feedBackFormNo").serialize();
        (validateEmailOnSubmit() || validateFeedbackOnSubmit()) && validateEmailOnSubmit() && validateFeedbackOnSubmit() && $.ajax({
            url: f + "/feedback/feedbackno",
            type: "GET",
            returnType: "text",
            data: a,
            success: function(a) {
                "SUCCESS" == a && ($(".search-feedback").hide(), $(".feed-back-categories").hide(), $(".feed-back").hide(), $(".feed-back-form").fadeIn())
            },
            fail: function(a) {
                alert("Failed to load categories")
            }
        })
    });
    $(".share-trigger").click(function() {
        $(this).parent().siblings(".share-wrapper").is(":visible") ? $(this).parent().siblings(".share-wrapper").hide() : ($(".share-wrapper").hide(), $(this).parent().siblings(".share-wrapper").show())
    });
    $(".share-wrapper-buybox").hide();
    $(".share-trigger-buybox").click(function() {
        $(".share-wrapper-buybox").toggle()
    });
    $(".pagination").parents(".bottom-pagination").find("li.prev a").append("<span class='lookbook-only'> Page</span>");
    $(".pagination").parents(".bottom-pagination").find("li.next a").append("<span class='lookbook-only'> Page</span>");
    $("#pin").focus(function() {
        $(this).attr("placeholder", "");
        $(this).siblings(".placeholder").hide()
    });
    $("#pin").blur(function() {
        "" == $("#pin").val() && $(this).attr("placeholder", "Pincode")
    });
    0 < $(".product-listing.product-grid.hero_carousel").children().length && ($(".product-listing.product-grid.hero_carousel").css("border-bottom", "2px solid #f0f4f5"), $(".product-listing.product-grid.hero_carousel").before("<h3 class='heroTitle'>Shop Our Top Picks</h3>"));
    authentic();
    $(window).on("load resize", function() {
        void 0 != $(".js-mini-cart-count").text() && null != $(".js-mini-cart-count").text() && $(".responsive-bag-count").text($(".js-mini-cart-count").text());
        var a = $(".page-authenticAndExclusive ul.feature-brands li");
        790 > $(window).width() ? a.css("min-height", "0") : authentic()
    });
    $(window).on("load resize", function(a) {
        773 > $(window).width() ? ($("span#mobile-menu-toggle").unbind("click"), $("span#mobile-menu-toggle").click(function() {
                $(this).parent("li").siblings().find("#mobile-menu-toggle").removeClass("menu-dropdown-arrow");
                $(this).parent("li").siblings().find("#mobile-menu-toggle + ul").slideUp();
                $(this).next().slideToggle();
                $(this).toggleClass("menu-dropdown-arrow")
            }), $("li.short.words").siblings("li.long.words").hide(),
            $("li.short.words").unbind("click"), $("li.short.words").click(function() {
                $(this).toggleClass("active");
                $(this).nextAll().each(function() {
                    if ($(this).hasClass("short")) return !1;
                    $(this).toggle(200)
                })
            })) : ($("#mobile-menu-toggle").next().attr("style", null), $("li.short.words,li.long.words").next().attr("style", null))
    });
    $(".customer-care-tabs>.tabs .customer-care-tab>ul>li .tabs li").click(function() {
        $(this).nextAll().removeClass("active");
        $(this).prevAll().removeClass("active")
    });
    $(window).on("load", function(a) {
        $(".sort-refine-bar.mobile").append('<span id="hidden-option-width" style="display: none;"></span>');
        $(".sort-refine-bar select.black-arrow-left").css("display", "block");
        $(".sort-refine-bar select.black-arrow-left").css("background-position-x", "30%");
        $(".sort-refine-bar select").change(function() {
            $("#hidden-option-width").html($(this).find("option:selected").text());
            var a = $("#hidden-option-width").width() + 30;
            $(".sort-refine-bar select.black-arrow-left").css("background-position-x", a)
        })
    });
    $(".progtrckr .progress.processing").each(function() {
        var a = $(this).children("span.dot").length;
        2 == a ? $(this).children("span.dot").first().css("marginLeft",
            "16.5%") : 1 == a && $(this).children("span.dot").first().css("marginLeft", "33%")
    });
    $(".progtrckr").each(function() {
        $(this).find(".progress.processing .dot:not(.inactive)").last().find("img").show()
    });
    $(window).on("load resize", function() {
        651 > $(window).width() && $(".feature-collections ul.collections li.chef.sub .simple-banner-component").each(function() {
            var a = $(this).find("h3").height();
            0 < a && (a += 30, $(this).siblings().css("padding-top", a))
        })
    });
    0 == $("#searchPageDeptHierTree").children().length && ($("#searchPageDeptHierTree").css("padding",
        "0px"), $("#searchPageDeptHierTree").parent("form").siblings("li.facet").first().css("border-top", "0px"));
    0 == $(".customer-service").find(".side-nav").length ? $(".customer-service .left-nav-footer-mobile").css("display", "none") : $(".customer-service .left-nav-footer-mobile").css("display", "block");
    $(".customer-service .side-nav ul li").each(function() {
        var a = $(this).find("a").attr("title"),
            b = $(this).find("a").attr("href");
        $(this).hasClass("active") ? $(".customer-service .left-nav-footer-mobile").append("<option value=" +
            b + " data-href=" + b + " selected>" + a + "</option>") : $(".customer-service .left-nav-footer-mobile").append("<option value=" + b + " data-href=" + b + ">" + a + "</option>")
    });
    $("#sameAsShipping").click(function() {
        $("#sameAsShipping").is(":checked") && $("#billingAddress fieldset .error-message").html("")
    });
    $(window).on("load resize", function() {
        var a = $(".main-image").find("img.picZoomer-pic").height() / 5;
        $(".imageList ul li img").css("height", a)
    });
    $(".marketplace-checkout").find("a").click(function(a) {
        a.preventDefault()
    });
    $(".marketplace-checkout").parents().find("header .content .top .marketplace.compact a").hide();
    $(window).scroll(function() {
        $(".ui-autocomplete").is(":visible") && $("#js-site-search-input").parents("form#search_form").next(".ui-autocomplete.ui-front.links.ui-menu").css({
            left: $("#js-site-search-input").offset().left,
            width: $("#js-site-search-input").outerWidth()
        })
    });
    $("#js-site-search-input").keydown(function() {
        $("#js-site-search-input").parents("form#search_form").next(".ui-autocomplete.ui-front.links.ui-menu").css({
            left: $("#js-site-search-input").offset().left,
            width: $("#js-site-search-input").outerWidth()
        })
    });
    $("input[name='j_username']").parents("form#extRegisterForm").attr("autocomplete", "off");
    $("input[name='email']").parents("form#loginForm").attr("autocomplete", "off");
    $("input[name='j_username'],input[name='email']").attr("autocomplete", "off");
    $("input[type='password']").attr("autocomplete", "new-password");
    $(window).on("load resize", function() {
        var a = $("body .account .right-account.rewards>div.your-activity>ul.coupon-container .coupon-box");
        if ("0px" ==
            a.css("margin-top")) {
            for (var b = 0; b < a.length; b += 3) {
                var c, e, d;
                c = parseInt(a.eq(b).find("h2").css("height")) + parseInt(a.eq(b).find("p.coupon_count").css("height")) + parseInt(a.eq(b).find("div.left").css("height"));
                e = parseInt(a.eq(b + 1).find("h2").css("height")) + parseInt(a.eq(b + 1).find("p.coupon_count").css("height")) + parseInt(a.eq(b + 1).find("div.left").css("height"));
                d = parseInt(a.eq(b + 2).find("h2").css("height")) + parseInt(a.eq(b + 2).find("p.coupon_count").css("height")) + parseInt(a.eq(b + 2).find("div.left").css("height"));
                c = Math.max(c, e, d) + 30;
                a.eq(b).css("height", c);
                a.eq(b + 1).css("height", c);
                a.eq(b + 2).css("height", c)
            }
            b = a.length % 3;
            2 == b && (c = parseInt(a.eq(a.length - 1).find("h2").css("height")) + parseInt(a.eq(a.length - 1).find("p.coupon_count").css("height")) + parseInt(a.eq(a.length - 1).find("div.left").css("height")), e = parseInt(a.eq(a.length - 2).find("h2").css("height")) + parseInt(a.eq(a.length - 2).find("p.coupon_count").css("height")) + parseInt(a.eq(a.length - 2).find("div.left").css("height")), c = Math.max(c, e) + 30, a.eq(a.length -
                1).css("height", c), a.eq(a.length - 2).css("height", c))
        } else {
            for (b = 0; b < a.length; b += 2) c = parseInt(a.eq(b).find("h2").css("height")) + parseInt(a.eq(b).find("p.coupon_count").css("height")) + parseInt(a.eq(b).find("div.left").css("height")), e = parseInt(a.eq(b + 1).find("h2").css("height")) + parseInt(a.eq(b + 1).find("p.coupon_count").css("height")) + parseInt(a.eq(b + 1).find("div.left").css("height")), c = Math.max(c, e) + 30, a.eq(b).css("height", c), a.eq(b + 1).css("height", c);
            b = a.length % 2;
            1 == b && a.eq(a.length - 1).css("height",
                "auto")
        }
    });
    "ontouchstart" in window && ($("body").addClass("touchDevice"), $("header .content nav > ul > li > ul > li > .toggle a").click(function() {
        $(this).attr("href", "#")
    }));
    0 == $(".lookbook_wrapper .bottom-pagination").children().length && $(".lookbook_wrapper .bottom-pagination").css("padding", "0");
    0 == $("body .lookbook_wrapper .lookbook-pagination").children().length && $("body .lookbook_wrapper .lookbook-pagination").css("padding", "0");
    0 == $(".lookbook_wrapper .listing.wrapper .product-listing.product-grid").children().length &&
        $(".lookbook_wrapper .listing.wrapper .product-listing.product-grid").parents().find(".listing.wrapper").css("height", "0px")
});
ACC.common = {
    processingMessage: $("<img src='" + ACC.config.commonResourcePath + "/images/spinner.gif'/>"),
    blockFormAndShowProcessingMessage: function(a) {
        a.parents("form:first").block({
            message: ACC.common.processingMessage
        })
    },
    refreshScreenReaderBuffer: function() {
        $("#accesibility_refreshScreenReaderBufferField").attr("value", (new Date).getTime())
    }
};
jQuery.extend({
    postJSON: function(a, b, c) {
        return jQuery.post(a, b, c, "json")
    }
});
$.ajaxPrefilter(function(a, b, c) {
    if ("post" === a.type || "POST" === a.type)
        if ((b = "undefined" === typeof a.data) || -1 === a.data.indexOf("CSRFToken")) a.data = (b ? "" : a.data + "&") + "CSRFToken=" + ACC.config.CSRFToken
});
ACC.colorbox = {
    config: {
        maxWidth: "100%",
        opacity: .7,
        width: "auto",
        transition: "none",
        close: "",
        title: '<div class="headline"><span class="headline-text">{title}</span></div>',
        onComplete: function() {
            errorColorBox();
            $.colorbox.resize();
            ACC.common.refreshScreenReaderBuffer()
        },
        onClosed: function() {
            errorColorBoxClosed();
            ACC.common.refreshScreenReaderBuffer()
        }
    },
    open: function(a, b) {
        b = $.extend({}, ACC.colorbox.config, b);
        b.title = b.title.replace(/{title}/g, a);
        return $.colorbox(b)
    },
    resize: function() {
        $.colorbox.resize()
    },
    close: function() {
        $.colorbox.close();
        $.colorbox.remove()
    }
};

function errorColorBox() {
    0 < $("#colorbox #cboxError").length && ($(".page-search #colorbox").removeAttr("style"), $(".page-search #colorbox").css("margin-top", "15%"))
}

function errorColorBoxClosed() {
    $(".page-search #colorbox").css("margin-top", "")
};
ACC.micrositeautocomplete = {
    _autoload: ["bindMicrositeSearchAutocomplete"],
    bindMicrositeSearchAutocomplete: function() {
        $.widget("custom.yautocomplete", $.ui.autocomplete, {
            _create: function() {
                var a = this.element.data("options");
                this._setOptions({
                    minLength: a.minCharactersBeforeRequest,
                    displayProductImages: a.displayProductImages,
                    delay: a.waitTimeBeforeRequest,
                    autocompleteUrl: a.autocompleteUrl,
                    source: this.source
                });
                $.ui.autocomplete.prototype._create.call(this)
            },
            options: {
                cache: {},
                focus: function() {
                    return !1
                },
                select: function(a,
                    b) {
                    window.location.href = b.item.url
                }
            },
            _renderItem: function(a, b) {
                if ("autoSuggestion" == b.type) {
                    var c = "<a href='" + ACC.config.encodedContextPath + "/search/?q=" + b.value + "&best_search_keyword=" + b.searchterm + "' ><div class='name'>" + b.value + "</div></a>";
                    return $("<li>").data("item.autocomplete", b).append(c).appendTo(a)
                }
                if ("productResult" == b.type) return c = "<a href='" + ACC.config.encodedContextPath + b.url + "' >", null != b.image && (c += "<img src='" + b.image + "'  />"), c += "<div class='name'>" + b.value + "</div>", c += "<div class='price'>" +
                    b.price + "</div>", c += "</a>", $("<li class='product'>").data("item.autocomplete", b).append(c).appendTo(a);
                if ("brands" == b.type) {
                    c = "<a href='" + ACC.config.contextPath + b.url + "' class='clearfix'>";
                    if (b.valueset || void 0 === b.index || 0 != b.index) c += "<span class=''>in " + b.value + "</span></a>";
                    else return c += "<span class=''><strong>" + b.term + "</strong><br>", $("<li>").data("item.autocomplete", b).append(c).appendTo(a);
                    return $("<li class='product-list'>").data("item.autocomplete", b).append(c).appendTo(a)
                }
                if ("category" ==
                    b.type) {
                    c = "<a href='" + ACC.config.contextPath + b.url + "' class='clearfix'>";
                    if (b.valueset || void 0 === b.index || 0 != b.index) c += "<span class=''>in " + b.value + "</span></a>";
                    else return c += "<span class=''><strong>" + b.term + "</strong><br>", $("<li>").data("item.autocomplete", b).append(c).appendTo(a);
                    return $("<li class='product-list' >").data("item.autocomplete", b).append(c).appendTo(a)
                }
                if ("productName" == b.type) return c = "<a href='" + ACC.config.contextPath + b.url + "' class=' clearfix'>", c += "<span class='title'>" + b.value +
                    "</span></span></a>", $("<li class='product-list'>").data("item.autocomplete", b).append(c).appendTo(a);
                if ("productResult" == b.type) return c = "<a href='" + ACC.config.contextPath + b.url + "' class='product-list clearfix'>", option.displayProductImages && null != b.image && (c += "<span class='thumb'><img src='" + b.image + "' /></span><span class='desc clearfix'>"), c += "<span class='title'>" + b.manufacturer + " " + b.value + "</span><span class='price'>" + b.price + "</span></span></a>", $("<li class='product-list'>").data("item.autocomplete",
                    b).append(c).appendTo(a)
            },
            source: function(a, b) {
                var c = this,
                    d = a.term.toLowerCase(),
                    e = $("#micrositeSearchCategory option:selected").val(),
                    k = d + ":" + e;
                if (k in c.options.cache) return b(c.options.cache[k]);
                $.getJSON(c.options.autocompleteUrl, {
                    term: a.term,
                    category: e
                }, function(a) {
                    var k = [];
                    null != a.brands && (void 0 != a.brands[0] && k.push({
                        value: a.brands[0].name,
                        code: a.brands[0].code,
                        desc: a.brands[0].description,
                        url: "/mpl/en/search/?q=" + a.searchTerm + "%3Arelevance%3Abrand%3A" + a.brands[0].code + "&search_category=" +
                            e + "&best_search_keyword=" + d,
                        term: a.searchTerm,
                        type: "brands",
                        index: 0,
                        valueset: !1
                    }), $.each(a.brands, function(b, c) {
                        k.push({
                            value: c.name,
                            code: c.code,
                            desc: c.description,
                            url: "/mpl/en/search/?q=" + a.searchTerm + "%3Arelevance%3Abrand%3A" + c.code + "&search_category=" + e + "&best_search_keyword=" + d,
                            term: a.searchTerm,
                            type: "brands",
                            index: b,
                            valueset: !0
                        })
                    }));
                    null != a.categories && (void 0 != a.categories[0] && k.push({
                        value: a.categories[0].name,
                        code: a.categories[0].code,
                        desc: a.categories[0].description,
                        url: "/mpl/en/search/?q=" +
                            a.searchTerm + "%3Arelevance%3Abrand%3A" + a.categories[0].code + "&search_category=" + e + "&best_search_keyword=" + d,
                        term: a.searchTerm,
                        type: "category",
                        index: 0,
                        valueset: !1
                    }), $.each(a.categories, function(b, c) {
                        k.push({
                            value: c.name,
                            code: c.code,
                            desc: c.description,
                            url: "/mpl/en/search/?q=" + a.searchTerm + "%3Arelevance%3Acategory%3A" + c.code + "&search_category=" + e + "&best_search_keyword=" + d,
                            term: a.searchTerm,
                            type: "category",
                            index: b,
                            valueset: !0
                        })
                    }));
                    null != a.suggestions && $.each(a.suggestions, function(a, b) {
                        0 != a && k.push({
                            value: b.term,
                            searchterm: d,
                            url: ACC.config.encodedContextPath + "/search?text=" + b.term + "&best_search_keyword=" + d,
                            type: "autoSuggestion"
                        })
                    });
                    null != a.products && $.each(a.products, function(a, b) {
                        k.push({
                            value: b.name,
                            code: b.code,
                            desc: b.description,
                            manufacturer: b.manufacturer,
                            url: b.url + "/?searchCategory=" + e + "&best_product_id=" + b.code + "&search_category=" + e + "&best_search_keyword=" + d,
                            price: b.price.formattedValue,
                            type: "productResult",
                            image: null != b.images && c.options.displayProductImages ? b.images[0].url : null
                        })
                    });
                    c.options.cache[d] =
                        k;
                    return b(k)
                })
            }
        });
        $micrositesearch = $(".js-site-micrositesearch-input");
        0 < $micrositesearch.length && $micrositesearch.yautocomplete()
    },
    bindSearchDropDown: function(a) {
        $("#micrositeSearchCategory").val("category-" + a)
    },
    bindSearchText: function(a) {
        $("#js-site-micrositesearch-input").val(a)
    },
    bindMicrositeSearchDropDown: function(a) {
        $("#micrositeSearchCategory").val(a)
    }
};
var sellerDetailsArray = [],
    sellerPageCount = 1;

function nextPage() {
    ++sellerPageCount;
    1 < sellerPageCount && $("#previousPageDev").show();
    setSellerLimits(sellerPageCount);
    focusOnElement()
}

function previousPage() {
    --sellerPageCount;
    sellerPageCount < Math.ceil(sellerDetailsArray.length / pageLimit) && $("#nextPageDev").show();
    setSellerLimits(sellerPageCount);
    focusOnElement()
}

function focusOnElement() {}
(function(a, b, c) {
    var d = a.getElementsByTagName(b)[0];
    a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.3", d.parentNode.insertBefore(a, d))
})(document, "script", "facebook-jssdk");
! function(a, b, c) {
    var d = a.getElementsByTagName(b)[0],
        e = /^http:/.test(a.location) ? "http" : "https";
    a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = e + "://platform.twitter.com/widgets.js", d.parentNode.insertBefore(a, d))
}(document, "script", "twitter-wjs");

function setSellerLimits(a) {
    var b = parseInt(pageLimit) * a,
        c = b - pageLimit,
        d = Math.ceil(sellerDetailsArray.length / pageLimit);
    b > sellerDetailsArray.length && (b = sellerDetailsArray.length);
    1 == a && ($("#previousPageDev").hide(), 1 < d && $("#nextPageDev").show());
    a == d && ($("#nextPageDev").hide(), 1 < d && $("#previousPageDev").show());
    for (a = 0; a < sellerDetailsArray.length; a++) a >= c && a < b ? $("#tr" + a + "Id").show() : $("#tr" + a + "Id").hide();
    b = c + 1 + "-" + b + " of " + sellerDetailsArray.length + " Sellers";
    $("#sellerCount .wrapper p").html(b)
}
var skuPriceMap = "",
    skuPriceArray = "";

function fetchSellers(a, b) {
    var c = $("#promotedSellerId").val(),
        d = $("#isproductPage").val(),
        e = $("#deliveryPretext").text(),
        k = $("#deliveryPosttext").text(),
        f = "",
        g = 0,
        h = "";
    sellerDetailsArray = [];
    skuPriceArray = [];
    var l = -1,
        m = -1,
        p = "",
        t = "",
        q = 0,
        y = 0;
    "false" == d && (sellerskuidList = $("#sellersSkuListId").val(), ussidIdsForED = $("#skuIdForED").val(), ussidIdsForHD = $("#skuIdForHD").val(), ussidIdsForCNC = $("#skuIdForCNC").val(), ussidIdsForCOD = $("#skuIdForCod").val(), stockUssidIds = $("#skuIdsWithNoStock").val(), stockUssidArray =
        $("#stockDataArray").val());
    for (d = 0; d < a.length; d++)
        if (b != a[d].ussid) {
            var u = 0;
            null != a[d].leadTimeForHomeDelivery && (u = a[d].leadTimeForHomeDelivery);
            if (-1 == sellerskuidList.indexOf(a[d].ussid)) {
                sellerDetailsArray[++m] = a[d];
                var f = f + ("<tr id='tr" + m + "Id'>"),
                    g = a[d].availableStock,
                    h = a[d].ussid,
                    A = "<div id='addToCartFormId" + m + "Title' name='addToCartFormId" + m + "Title' class='addToCartTitle'>" + $("#addtocartid").text() + "</div><div id='addToCartFormId" + m + "Title' class='addToCartTitle sellerAddToBagTitle'>" + $("#addtocartid").text() +
                    "</div><form method='post'  name='addToCartFormId" + m + "' id='addToCartFormId" + m + "' class='add_to_cart_form' action='#'>",
                    f = f + "<td width='278px'><h3>",
                    f = f + a[d].sellername,
                    f = f + "</h3></td>",
                    f = f + "<td width='153px'>";
                null != a[d].spPrice && "" != a[d].spPrice && 0 != a[d].spPrice.value ? (p = a[d].spPrice, t = a[d].mrpPrice, q = p.value, y = t.value) : null != a[d].mopPrice && "" != a[d].mopPrice.value ? (p = a[d].mopPrice, t = a[d].mrpPrice, q = p.value, y = t.value) : (p = a[d].mrpPrice, q = p.value);
                skuPriceMap = {};
                skuPriceMap.key = a[d].ussid;
                skuPriceMap.value =
                    q;
                skuPriceArray[++l] = skuPriceMap;
                f += "<div class='price price-line-height'>";
                0 < y && y != q && (f += "<del>", f += t.formattedValue, f += "</del>", f += " ");
                f += "<font color=#ff1c47>";
                f += p.formattedValue;
                f += "</font>";
                f += "</div>";
                void 0 != c && -1 != c.indexOf(a[d].sellerID) && (f += "<div class='tooltip_wrapper offer-tooltip-wrapper'><a name='yes' id='offer" + m + "' >Offer Available</a><span class='tooltip_pop offer-popover'>" + promoData.promoDescription + "<br><br>From&nbsp;" + promoStartDate + "<br>To&nbsp;" + promoEndDate + "<br>'</span></div>");
                parseFloat(q) > emiCuttOffAmount.value && (f += "<div class='emi'>", f += $("#emiavailableid").text(), f += "</div>");
                var f = f + "</td>",
                    n = a[d].deliveryModes,
                    p = "",
                    r = !1,
                    z = q = !1,
                    v;
                for (v in n) - 1 != n[v].code.toLowerCase().indexOf("home") && (r = !0), -1 != n[v].code.toLowerCase().indexOf("express") && (q = !0), -1 != n[v].code.toLowerCase().indexOf("collect") && (z = !0), p += n[v].code + "-" + n[v].deliveryCost.formattedValue;
                n = "";
                if ("true" != $("#isPinCodeChecked").val()) {
                    if (r) var r = parseInt($("#homeStartId").val()) + u,
                        w = parseInt($("#homeEndId").val()) +
                        u,
                        r = e + r + "-" + w + k,
                        x = availableDeliveryATPForHD.concat("-").concat(r),
                        n = n + (x + "<br/>");
                    q && (n += availableDeliveryATPForED + "<br/>");
                    z && (n += availableDeliveryATPForCNC + "<br/>")
                } else -1 != ussidIdsForED.indexOf(h) && (r = parseInt($("#expressStartId").val()) + u, w = parseInt($("#expressEndId").val()) + u, r = e + r + "-" + w + k, n += availableDeliveryATPForED + "<br/>"), -1 != ussidIdsForHD.indexOf(h) && (r = parseInt($("#homeStartId").val()) + u, w = parseInt($("#homeEndId").val()) + u, r = e + r + "-" + w + k, "" != x && (x = availableDeliveryATPForHD.concat("-").concat(r)),
                    n += x + "<br/>"), -1 != ussidIdsForCNC.indexOf(h) && (r = parseInt($("#clickStartId").val()) + u, w = parseInt($("#clickEndId").val()) + u, r = e + r + "-" + w + k, "" != x && (x = availableDeliveryATPForCNC.concat("-").concat(r)), n += x + "<br/>");
                f += "<td width='669px'><ul>";
                f += "<li>";
                f += n;
                f += "</li>";
                "true" == $("#isPinCodeChecked").val() ? -1 != ussidIdsForCOD.indexOf(h) && (f += "<li>" + $("#cashondeliveryid").text() + "</li>") : "Y" == a[d].isCod && (f += "<li>" + $("#cashondeliveryid").text() + "</li>");
                f += "<li>";
                f += a[d].replacement + $("#replacementguranteeid").text();
                f += "</li>";
                f += "<li><span class='tooltip_wrapper'><a>" + $("#deliveryratesid").text() + "</a><span class='tooltip_pop'>" + p + "</span></span> & ";
                f += "<span class='tooltip_wrapper'><a>" + $("#returnpolicyid").text() + "</a><span class='tooltip_pop'>" + a[d].returnPolicy + "&nbsp;days</span></span></li>";
                f += "</ul></td>";
                f += "<td width='219px'>";
                f += A;
                if ("" != $("#stockDataArray").val() && $("#stockDataArray").val() != [])
                    for (u = 0; u < stockDataArray.length; u++) stockDataArray[u].ussid == a[d].ussid && (g = stockDataArray[u].stock);
                f +=
                    "<input type='hidden' size='1' id='stock' name='stock' value=" + g + ">";
                f += "<input type='hidden' size='1' id='ussid' name='ussid' value=" + h + ">";
                "true" != $("#isPinCodeChecked").val() ? 0 >= g || null == a[d].deliveryModes ? $("#addToCartButton" + m).hide() : (f += "<div id='addToCartFormId" + m + "excedeInventory' style='display:none;'>" + $("#addToCartFormexcedeInventory").text() + "</div>", f += "<div id='addToCartFormId" + m + "noInventory' style='display:none;'>" + $("#addToCartFormnoInventory").text() + "</div>", f += "<button id='addToCartButton" +
                    m + "' type='button' class='button add-to-bag btn-block js-add-to-cart'>" + $("#addtobagid").text() + "</button>", f += $("#hiddenIdForStock").html()) : -1 != stockUssidIds.indexOf(a[d].ussid) ? $("#addToCartButton" + m).hide() : (f += "<div id='addToCartFormId" + m + "excedeInventory' style='display:none;'>" + $("#addToCartFormexcedeInventory").text() + "</div>", f += "<div id='addToCartFormId" + m + "noInventory' style='display:none;'>" + $("#addToCartFormnoInventory").text() + "</div>", f += "<button id='addToCartButton" + m + "' type='button' class='button add-to-bag btn-block js-add-to-cart'>" +
                    $("#addtobagid").text() + "</button>", f += $("#hiddenIdForStock").html());
                f += "</form>";
                f += "<form id='wish'>";
                f += $("#hiddenWishListId").html();
                f += "<a onClick='openPop(\"" + h + "\");' id='wishlist' class='wishlist add-to-wishlist' data-toggle='popover' data-placement='bottom'>Add to Wishlist</a>";
                f += "</form>";
                f += "</td>";
                f += "</tr>";
                "false" == $("#pinCodeChecked").val() && addToBag(m)
            }
        }
    $("#sellerDetailTbdy").html(f);
    c = sellerDetailsArray.length;
    1 < c && $("#sort").show();
    $("#otherSellersCount").html(c);
    $("a.add-to-wishlist#wishlist").popover({
        html: !0,
        content: function() {
            return $(this).parents("body").find(".add-to-wishlist-container").html()
        }
    })
}

function addToBag(a) {
    $(document).on("click", "#addToCartFormId" + a + " .js-add-to-cart", function() {
        ACC.product.sendAddToBag("addToCartFormId" + a)
    })
}

function sendAddToBag(a) {
    var b = $("#" + a).serialize();
    $.ajax({
        url: ACC.config.encodedContextPath + "/cart/add",
        data: b,
        type: "POST",
        cache: !1,
        success: function(b) {
            "" == b ? ($("#" + a + "Title").show(), $("#" + a + "Title").html(""), $("#" + a + "Title").html("<font color='blue'>" + $("#addtocartid").text() + "</font>"), ACC.product.displayAddToCart(b, a)) : "reachedMaxLimit" == b ? ($("#" + a + "Title").show(), $("#" + a + "Title").html(""), $("#" + a + "Title").html("<br/><font color='red'>" + $("#addtocartaboutfullid").text() + "</font>")) : ($("#" + a +
                "Title").show(), $("#" + a + "Title").html(""), $("#" + a + "Title").html("<font color='red'>" + $("#addtocartfullid").text() + "</font>"))
        },
        error: function(a) {}
    })
}

function fetchAllSellers(a) {
    var b = $("#ussid").val();
    $("#isproductPage").val();
    var c = $("#product").val();
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/p/" + c + "/otherSellerDetails",
        data: "productCode=" + c,
        dataType: "json",
        success: function(c) {
            null == c || "" == c || 1 == c.length ? ($("#sellerTable").hide(), $("#other-sellers-id").hide()) : (fetchSellers(c, b), otherSellersCount = c.length, setSellerLimits(1), void 0 != a && $('form[name^="addToCartFormId"]').each(function() {
                for (var b =
                        $("#" + this.name + " :input[name='ussid']"), c = $("#" + this.name + " :input[name='stock']"), d = 0; d < a.length; d++) void 0 != $(b).val() && a[d].ussid == $(b).val() && $(c).val(a[d].stock)
            }))
        },
        error: function(a, b, c) {
            $("#sellerTable").hide();
            $("#other-sellers-id").hide()
        }
    })
}

function sortSellers(a) {
    1 == a ? sortPrice(sellerPageCount) : 2 == a ? sortPriceDesc(sellerPageCount) : 3 == a ? sellerNameAsc(sellerPageCount) : 4 == a && sellerNameDesc(sellerPageCount)
}

function sortPrice(a) {
    var b = $("#ussid").val(),
        c = "",
        d = "";
    sellerDetailsArray.sort(function(a, b) {
        for (var f = 0; f < skuPriceArray.length; f++) skuPriceArray[f].key == a.ussid && (c = skuPriceArray[f].value), skuPriceArray[f].key == b.ussid && (d = skuPriceArray[f].value);
        return c - d
    });
    fetchSellers(sellerDetailsArray, b);
    setSellerLimits(a)
}

function sortPriceDesc(a) {
    var b = $("#ussid").val(),
        c = "",
        d = "";
    sellerDetailsArray.sort(function(a, b) {
        for (var f = 0; f < skuPriceArray.length; f++) skuPriceArray[f].key == a.ussid && (c = skuPriceArray[f].value), skuPriceArray[f].key == b.ussid && (d = skuPriceArray[f].value);
        return d - c
    });
    fetchSellers(sellerDetailsArray, b);
    setSellerLimits(a)
}
$(document).ready(function() {
    $(document).on("mouseenter", "span.tooltip_wrapper", function(a) {
        $(a.currentTarget).children().eq(1).css("visibility", "visible")
    });
    $(document).on("mouseleave", "span.tooltip_wrapper", function(a) {
        $(a.currentTarget).children().eq(1).css("visibility", "hidden")
    });
    $("#other-sellers-id").length && window.scrollTo(0, $("#other-sellers-id").offset().top)
});

function firstToUpperCase(a) {
    return a.substr(0, 1).toUpperCase() + a.substr(1)
};
ACC.contactus = {
    bindAll: function() {
        this.renderWidget();
        this.renderTabContents();
        this.validateFields()
    },
    renderWidget: function() {
        $("#hasError").val() && ($(".customer-care-tabs .tabs li.active li.second").html($(".contactUsForm")), $("#contactUsForm, .wrapper.contactUsForm").show(), $("#emailId").prop("readonly", !1));
        $(".customer-care-tab .nav>li").removeClass("active");
        $(".customer-care-tab .nav>li").eq(0).addClass("active");
        $("#recaptchaWidget").show();
        $("#captchaError").empty();
        $("#captchaError").hide();
        $("#submitRequestButton").click(function() {
            $("#captchaError").hide();
            if ($("#g-recaptcha-response").val()) return $(this).addClass("captcha-error-hide"), $(this).removeClass("captcha-error-show"), !0;
            $(this).addClass("captcha-error-show");
            $(this).removeClass("captcha-error-hide");
            $("#captchaError").show();
            $("#captchaError").html("Please verify that you are not a bot!");
            return !1
        })
    },
    renderTabContents: function() {
        $(".customer-care-tabs>.nav-wrapper>.nav>li").each(function(a) {
            $(".customer-care-tabs>.nav-wrapper>.nav>li").eq(a).click(function() {
                $(".customer-care-tabs>.nav-wrapper>.nav>li,.customer-care-tabs>.tabs>li").removeClass("active");
                $(this).addClass("active");
                $(".customer-care-tabs>.tabs>li").eq(a).addClass("active");
                $(".customer-care-tab .tabs>li,.customer-care-tab .nav>li").removeClass("active");
                $(".customer-care-tabs>.tabs>li").eq(a).find(".customer-care-tab .tabs>li:first-child,.customer-care-tab .nav>li:first-child").addClass("active")
            })
        });
        $(".customer-care-tab .nav>li").each(function(a) {
            $(".customer-care-tab .nav>li").eq(a).hover(function() {
                $(".customer-care-tab .tabs>li,.customer-care-tab .nav>li").removeClass("active");
                $(this).addClass("active");
                $(".customer-care-tab .tabs>li").eq(a).addClass("active")
            })
        });
        $("#needAssistance").click(function() {
            $("#contactEmailField").show();
            $("#contactOrderField").show();
            $(".error").empty();
            $("#captchaError").empty();
            $(".error-message").empty();
            $("#message").val("")
        });
        $("#newComplain").click(function() {
            $("#contactEmailField").show();
            $("#contactOrderField").hide();
            $(".error").empty();
            $("#captchaError").empty();
            $(".error-message").empty();
            $("#message").val("")
        });
        $(".faq .question a").click(function(a) {
            a.preventDefault();
            $(".customer-care-tabs .tabs li.active li.second").html($(".contactUsForm"));
            $(".contactUsForm").show();
            "fixed" == $("header .bottom").css("position") ? $("body, html").animate({
                scrollTop: $(".contactUsForm").offset().top - $("header .bottom.active").height()
            }, "500") : $("body, html").animate({
                scrollTop: $(".contactUsForm").offset().top
            }, "500");
            $(".faq .question").removeClass("active");
            $(this).parent().addClass("active");
            $("#issueDetails").val($(".customer-care-tab .nav>li.active").text() + " > " + $(".faq .question.active a").text())
        });
        $(".customer-care-boxes h1").click(function() {
            $(this).parent().parent().hasClass("active") ? $(this).parent().parent().removeClass("active") : $(this).parent().parent().addClass("active")
        });
        $("#contactUsForm .file-input button").click(function(a) {
            a.preventDefault();
            $("#contactUsForm .file-input #file").click()
        });
        $("#file").change(function() {
            $('.file-input input[type="text"]').val($("#file").val().replace(/([^\\]*\\)*/, ""))
        })
    },
    validateFields: function() {
        $(".error").hide();
        $("#submitRequestButton").click(function(a) {
            $(".error").empty();
            $(".error").hide();
            "active" == $("#needAssistance").attr("class") && "" == $("#orderDetails").val() && ($("#orderError").show(), $("#orderError").html("Please enter a valid order id"), a.preventDefault());
            "" == $("#emailId").val() && ($("#emailError").show(), $("#emailError").html("Please enter a valid email id"), a.preventDefault());
            /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test($("#emailId").val()) || ($("#emailError").show(), $("#emailError").html("Please enter a valid email id"), a.preventDefault());
            "" == $("#message").val() &&
                ($("#messageError").show(), $("#messageError").html("Please enter a valid message"), a.preventDefault())
        })
    }
};
$(document).ready(function() {
    null != $("#contactUsForm").html() && ACC.contactus.bindAll()
});
ACC.langcurrency = {
    _autoload: ["bindLangCurrencySelector"],
    bindLangCurrencySelector: function() {
        $("#lang-selector").change(function() {
            $("#lang-form").submit()
        });
        $("#currency-selector").change(function() {
            $("#currency-form").submit()
        })
    }
};
ACC.checkout = {
    _autoload: ["bindCheckO", "bindForms", "bindSavedPayments"],
    bindForms: function() {
        $(document).on("click", "#addressSubmit", function(a) {
            a.preventDefault();
            $("#addressForm").submit()
        });
        $(document).on("click", "#deliveryMethodSubmit", function(a) {
            a.preventDefault();
            $("#selectDeliveryMethodForm").submit()
        });
        $(document).on("click", "#deliveryAddressSubmit", function(a) {
            a.preventDefault();
            a = $("input[name=selectedAddressCode]:checked").val();
            if (null == a || "undefined" == a) return alert("Please select a delivery address"), !1;
            $("#selectAddressForm").submit()
        })
    },
    bindSavedPayments: function() {
        $(document).on("click", ".js-saved-payments", function(a) {
            a.preventDefault();
            ACC.colorbox.open("", {
                href: "#savedpayments",
                inline: !0,
                width: "320px"
            })
        })
    },
    bindCheckO: function() {
        $(".doFlowSelectedChange").change(function() {
            "multistep-pci" == $("#selectAltCheckoutFlow").attr("value") ? $("#selectPciOption").css("display", "") : $("#selectPciOption").css("display", "none")
        });
        $(".continueShoppingButton").click(function() {
            var a = $(this).data("continueShoppingUrl");
            window.location = a
        });
        $(".expressCheckoutButton").click(function() {
            document.getElementById("expressCheckoutCheckbox").checked = !0
        });
        $(document).on("change", ".confirmGuestEmail,.guestEmail", function() {
            var a = $(".guestEmail").val(),
                b = $(".confirmGuestEmail").val();
            a === b ? $(".guestCheckoutBtn").removeAttr("disabled") : $(".guestCheckoutBtn").attr("disabled", "disabled")
        })
    }
};

function constructDepartmentHierarchy(a) {
    for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c].split("|"),
            e = b;
        0 == c && "" == $("#isCategoryPage").val() && (b[0] = {
            label: "All",
            children: [],
            categoryCode: "",
            categoryType: "All",
            categoryName: ""
        });
        for (var k = 0; k < d.length; k++)
            if (null != d[k] && 0 < d[k].length) {
                var f = d[k].split(":"),
                    g = f[0],
                    h = f[1],
                    l = "category";
                "true" == f[3] && (l = "department");
                for (var f = e, m = 0; m < e.length; m++)
                    if (e[m].categoryName == h) {
                        e = e[m].children;
                        break
                    }
                f == e && (e = (e[m] = {
                    label: h,
                    children: [],
                    categoryCode: g,
                    categoryType: l,
                    categoryName: h
                }).children)
            }
    }
    a = !1;
    2 == b.length && (a = !0);
    "true" == $("#isCategoryPage").val() ? $("#categoryPageDeptHierTree").tree({
        data: b,
        autoOpen: !0
    }) : ($("#searchPageDeptHierTree").tree({
        data: b,
        autoOpen: a
    }), "true" != $("#isConceirge").val() && ACC.autocomplete.bindSearchText($("#text").val()));
    $("#categoryPageDeptHierTree").bind("tree.click", function(a) {
        a = a.node;
        if ("All" != a.categoryType) {
            var b = ACC.config.contextPath,
                b = b + "/Categories/" + a.label + "/c/" + a.categoryCode;
            $("#categoryPageDeptHierTreeForm").attr("action",
                b);
            $("#categoryPageDeptHierTreeForm").submit()
        }
    });
    $("#searchPageDeptHierTree").bind("tree.click", function(a) {
        a = a.node;
        "All" == a.categoryType ? ($("#q").val($("#text").val() + ":relevance"), $("#searchCategoryTree").val("all")) : ($("#q").val($("#text").val() + ":relevance:category:" + a.categoryCode), $("#searchCategoryTree").val(a.categoryCode));
        $("#searchPageDeptHierTreeForm").submit()
    })
};
$(document).ready(function() {
    $(document).on("click", "#chatMe", function(a) {
        a.preventDefault();
        a = $(this).attr("href");
        $.get(a, function(a) {
            $(a).modal()
        }).success(function() {})
    });
    $(document).on("click", "#submitC2C", function() {
        $(".error").each(function() {
            $(this).empty()
        });
        $.ajax({
            url: ACC.config.encodedContextPath + "/clickto/invoke-chat",
            type: "GET",
            dataType: "JSON",
            data: $("#chatForm").serialize(),
            success: function(a) {
                var b = !1;
                null != a.error_name && ($("label[for=errorCustomerName]").text(a.error_name), b = !0);
                null != a.error_email && ($("label[for=errorCustomerEmail]").text(a.error_email), b = !0);
                null != a.error_contact && ($("label[for=errorCustomerMobileNo]").text(a.error_contact), b = !0);
                b || (a = chatUrl + "?name=" + encodeURI($("input[name=customerName]").val()) + "&email=" + $("input[name=emailId]").val() + "&phone=" + $("input[name=contactNo]").val() + "&reason=" + encodeURI($("select[name=reason]").val()), window.open(a, "Chat", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=750, height=650, top=" +
                    (screen.height / 2 - 325) + ", left=" + (screen.width / 2 - 375)), $("#clicktoChatModal").remove())
            },
            fail: function(a) {
                alert("Sorry we are unable to connect to chat services. Please try again later.")
            }
        })
    });
    $(document).on("hide.bs.modal", function() {
        $("#clicktoChatModal").remove();
        $(".modal-backdrop.in").remove()
    })
});
$(document).ready(function() {
    $("#collapsible-panels div").hide();
    $("#collapsible-panels a").click(function(a) {
        $(this).parent().next("#collapsible-panels div").slideToggle("slow");
        $(this).parent().toggleClass("active");
        a.preventDefault()
    })
});
ACC.storefinder = {
    _autoload: [
        ["init", 0 != $(".js-store-finder").length],
        ["bindStoreChange", 0 != $(".js-store-finder").length],
        ["bindSearch", 0 != $(".js-store-finder").length], "bindPagination"
    ],
    storeData: "",
    storeId: "",
    coords: {},
    storeSearchData: {},
    createListItemHtml: function(a, b) {
        var c;
        c = '<li class="store-finder-navigation-list-entry">' + ('<input type="radio" name="storeNamePost" value="' + a.displayName + '" id="store-filder-entry-' + b + '" class="js-store-finder-input" data-id="' + b + '">');
        c += '<label for="store-filder-entry-' +
            b + '" class="js-select-store-label">';
        c += '<span class="store-finder-navigation-list-entry-info">';
        c += '<span class="store-finder-navigation-list-entry-name">' + a.displayName + "</span>";
        c += '<span class="store-finder-navigation-list-entry-address">' + a.line1 + " " + a.line2 + "</span>";
        c += '<span class="store-finder-navigation-list-entry-city">' + a.town + "</span>";
        c += "</span>";
        c += '<span class="store-finder-navigation-list-entry-distance">';
        c += "<span>" + a.formattedDistance + "</span>";
        c += "</span>";
        c += "</label>";
        return c +=
            "</li>"
    },
    refreshNavigation: function() {
        var a = "";
        if (data = ACC.storefinder.storeData) {
            for (i = 0; i < data.data.length; i++) a += ACC.storefinder.createListItemHtml(data.data[i], i);
            ACC.storefinder.bindStoreTestChange()
        }
        $("storeFinder").addClass("display: block")
    },
    bindPagination: function() {
        console.debug("bindPagination" + document.getElementById("store-finder-map"))
    },
    bindStoreChange: function() {
        $(document).ready(function(a) {
            ACC.global.addGoogleMapsApi("ACC.storefinder.loadinitGoogleMap")
        });
        $(document).on("change",
            "#storelocator-query",
            function(a) {
                console.debug($("#storelocator-query").val());
                (a = $("#storelocator-query").val()) && $("#storeSearchTextValue").text(a)
            })
    },
    initGoogleMap: function() {
        0 < $(".js-store-finder-map").length && ACC.global.addGoogleMapsApi("ACC.storefinder.loadGoogleMap")
    },
    loadGoogleMap: function() {
        storeInformation = ACC.storefinder.storeId;
        var a = Number($("#markerZoom").val()),
            b = Number($("#initialZoom").val());
        if (0 < $(".js-store-finder-map").length) {
            $(".js-store-finder-map").attr("id", "store-finder-map");
            for (var c = new google.maps.LatLng(storeData[0].latitude, storeData[0].longitude), b = {
                    zoom: b,
                    zoomControl: !1,
                    panControl: !1,
                    streetViewControl: !1,
                    disableDefaultUI: !0,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: c
                }, d = new google.maps.Map(document.getElementById("store-finder-map"), b), b = 0; b < storeData.length; b++) {
                var c = storeData[b],
                    e = "",
                    e = c.iconUrl ? c.iconUrl : "https://maps.google.com/mapfiles/markerA.png",
                    c = new google.maps.Marker({
                        position: new google.maps.LatLng(c.latitude, c.longitude),
                        map: d,
                        title: c.name,
                        icon: e
                    }),
                    k = new google.maps.InfoWindow({
                        content: "",
                        disableAutoPan: !1,
                        maxWidth: 100
                    });
                google.maps.event.addListener(k, "closeclick", function() {
                    ACC.storefinder.removeGamma(d)
                });
                google.maps.event.addListener(c, "click", function(b, c) {
                    return function() {
                        var e = storeData[c],
                            l = '<div style="width:200px; height:100px">' + e.displayName + " " + e.name + "</br> Distance Appx." + e.formattedDistance + " </br>" + e.line1 + " " + e.line2,
                            m = "";
                        if (e.openings) {
                            var e = e.openings,
                                p;
                            for (p in e) m += "</br>" + p + " : " + e[p]
                        }
                        k.setContent(l + m + "</div>");
                        k.open(d,
                            b);
                        d.setZoom(a);
                        d.setCenter(b.getPosition());
                        ACC.storefinder.applyGamma(d)
                    }
                }(c, b));
                c.setMap(d)
            }
            ACC.storefinder.staticLegends(d)
        }
    },
    bindSearch: function() {
        $(document).on("submit", "#storeFinderForm", function(a) {
            a.preventDefault();
            a = $(".js-store-finder-search-input").val();
            0 < a.length ? ACC.storefinder.getInitStoreData(a) : 1 > $(".js-storefinder-alert").length && (a = $(".btn-primary").data("searchEmpty"), $("#storeFinder").before('<div class="js-storefinder-alert alert alert-danger alert-dismissable" ><button class="close" type="button" data-dismiss="alert" aria-hidden="true">\u00d7</button>' +
                a + "</div>"))
        });
        $(document).on("click", "#findStoresNearMe", function(a) {
            $("#findStoresNearMe").addClass("disabled");
            ACC.storefinder.getInitStoreData(null, ACC.storefinder.coords.latitude, ACC.storefinder.coords.longitude);
            $("#findStoresNearMe").removeAttr("disabled")
        })
    },
    getStoreData: function(a) {
        ACC.storefinder.storeSearchData.page = a;
        url = $(".js-store-finder").data("url");
        $.ajax({
            url: url,
            data: ACC.storefinder.storeSearchData,
            type: "get",
            success: function(a) {
                console.info("ajax..got sucess full data.");
                console.info(a);
                a ? (ACC.storefinder.storeData = $.parseJSON(a), ACC.storefinder.refreshNavigation()) : ACC.storefinder.showError()
            }
        })
    },
    getInitStoreData: function(a, b, c) {
        $(".alert").remove();
        data = {
            q: "",
            page: 0
        };
        null != a && (data.q = a);
        null != b && (data.latitude = b);
        null != c && (data.longitude = c);
        ACC.storefinder.storeSearchData = data;
        ACC.storefinder.getStoreData(data.page)
    },
    init: function() {
        $("#initialZoom");
        $("#findStoresNearMe").addClass("disabled");
        navigator.geolocation && navigator.geolocation.getCurrentPosition(function(a) {
            ACC.storefinder.coords =
                a.coords;
            $("#findStoresNearMe").removeAttr("disabled")
        }, function(a) {
            console.log("An error occurred... The error code and message are: " + a.code + "/" + a.message)
        })
    },
    loadinitGoogleMap: function() {
        var a = Number($("#initialZoom").val()),
            b = $("#defLatitude").val(),
            c = $("#defLongitude").val(),
            a = Number($("#initialZoom").val());
        $(".js-store-finder-map").attr("id", "store-finder-map");
        b = new google.maps.LatLng(b, c);
        a = {
            zoom: a,
            zoomControl: !1,
            panControl: !1,
            streetViewControl: !1,
            disableDefaultUI: !0,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: b
        };
        a = new google.maps.Map(document.getElementById("store-finder-map"), a);
        ACC.storefinder.staticLegends(a)
    },
    bindStoreTestChange: function() {
        storeData = ACC.storefinder.storeData.data;
        var a = $(this).data("id");
        console.info(storeData);
        ACC.storefinder.storeId = storeData[a];
        ACC.storefinder.initGoogleMap()
    },
    showError: function() {
        var a = $("#storefinderNoresult").val();
        globalErrorPopup(a)
    },
    applyGamma: function(a) {
        a.setOptions({
            styles: [{
                stylers: [{
                    gamma: 10
                }]
            }]
        })
    },
    removeGamma: function(a) {
        a.setOptions({
            styles: [{
                stylers: [{
                    gamma: 0
                }]
            }]
        })
    },
    staticLegends: function(a) {
        var b = document.createElement("div");
        b.style.background = "white";
        b.style.padding = "10px";
        var c = "http://maps.google.com/mapfiles/ms/icons/red-dot.png http://maps.google.com/mapfiles/ms/icons/green-dot.png http://maps.google.com/mapfiles/ms/icons/blue-dot.png http://maps.google.com/mapfiles/ms/icons/orange-dot.png http://maps.google.com/mapfiles/ms/icons/purple-dot.png http://maps.google.com/mapfiles/ms/icons/pink-dot.png http://maps.google.com/mapfiles/ms/icons/yellow-dot.png".split(" ");
        console.info(b);
        for (var d = 0; d < c.length; d++) {
            var e = document.createElement("div");
            e.innerHTML = 'Sample Data<img src="' + c[d] + '"> ';
            b.appendChild(e)
        }
        a.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(b)
    }
};
ACC.forgottenpassword = {
    _autoload: ["bindLink"],
    bindLink: function() {
        $(document).on("click", ".js-password-forgotten", function(a) {
            a.preventDefault();
            a = $(this).attr("href");
            $.get(a, function(a) {
                $(a).filter(".forgotten-password").modal();
                $("#forgotPasswordSuccessPopup").remove();
                $(".forgotten-password").remove();
                ACC.forgottenpassword.validateForgetEmail();
                ACC.forgottenpassword.validateForgetSMS()
            })
        });
        $(document).on("hide.bs.modal", "#forgotPasswordSuccessPopup", function(a) {
            $(".forgotten-password").modal("hide")
        })
    },
    validateForgetEmail: function() {
        $(document).on("click", "#forgotPasswordByEmailAjax", function(a) {
            forgotPassword = $(this).parents().find("#forgotPassword_email").val();
            var b = "forgotPassword_email=" + forgotPassword;
            $(".PasswordForgotReset").css("display", "block");
            $.ajax({
                url: "/store/mpl/en/login/pw/request/confirmEmail",
                type: "GET",
                returnType: "text/html",
                data: b,
                success: function(b) {
                    "empty_or_null" == b ? $(a.target).parent().parent().find("span#errorHolder").text("Please enter an email id") : "invalid_email_format" ==
                        b ? $(a.target).parent().parent().find("span#errorHolder").text("Please enter a valid email id") : "invalid_email" == b ? $(a.target).parent().parent().find("span#errorHolder").text("Oops! This email ID isn't registered with us.") : "success" == b && (b = $(".js-password-forgotten").attr("href"), $.get(b, function(a) {
                            $(".forgotten-password").modal("hide");
                            $(a).filter("#forgotPasswordSuccessPopup").modal()
                        }))
                },
                fail: function() {
                    alert(data)
                }
            })
        })
    },
    validateForgetSMS: function() {
        $("#forgotPasswordBySmsAjax").click(function(a) {
            $.ajax({
                url: "/store/mpl/en/login/pw/request/confirmEmail/sms",
                type: "GET",
                returnType: "text/html",
                data: {
                    forgotPassword_email: $("input[name=forgotPassword_email]").val()
                },
                success: function(b) {
                    "empty_or_null" == b ? $(a.target).parent().parent().find("span#errorHolder").text("Please enter an email id") : "invalid_email_format" == b ? $(a.target).parent().parent().find("span#errorHolder").text("Please enter a valid email id") : "invalid_email" == b ? $(a.target).parent().parent().find("span#errorHolder").text("Email id is not registered") : ($(a.target).parent().parent().attr("action",
                        ACC.config.encodedContextPath + "/login/pw/passwordOTP?sms="), $(a.target).parent().parent().submit())
                },
                fail: function() {
                    alert(data)
                }
            })
        })
    }
};

function changeUrlUpdatePwd(a) {
    a = ACC.config.encodedContextPath + "/login/pw/change?token=" + a;
    "undefined" != typeof history.pushState ? (a = {
        Url: a
    }, history.pushState(a, a.Title, a.Url)) : alert("ERROR!!!")
}

function encodePwd() {
    var a = $("#updatePwd-pwd").val(),
        b = $("#updatePwd-checkPwd").val(),
        a = encodeURIComponent(a),
        b = encodeURIComponent(b);
    $("#updatePwd-pwd").val(a);
    $("#updatePwd-checkPwd").val(b);
    $("#frmUpdatePassword").submit()
};
"function" !== typeof Object.create && (Object.create = function(a) {
    function b() {}
    b.prototype = a;
    return new b
});
(function(a, b, c) {
    var d = {
        init: function(b, c) {
            this.$elem = a(c);
            this.options = a.extend({}, a.fn.owlCarousel.options, this.$elem.data(), b);
            this.userOptions = b;
            this.loadContent()
        },
        loadContent: function() {
            function b(a) {
                var e, d = "";
                if ("function" === typeof c.options.jsonSuccess) c.options.jsonSuccess.apply(this, [a]);
                else {
                    for (e in a.owl) a.owl.hasOwnProperty(e) && (d += a.owl[e].item);
                    c.$elem.html(d)
                }
                c.logIn()
            }
            var c = this,
                d;
            "function" === typeof c.options.beforeInit && c.options.beforeInit.apply(this, [c.$elem]);
            "string" === typeof c.options.jsonPath ?
                (d = c.options.jsonPath, a.getJSON(d, b)) : c.logIn()
        },
        logIn: function() {
            this.$elem.data({
                "owl-originalStyles": this.$elem.attr("style"),
                "owl-originalClasses": this.$elem.attr("class")
            });
            this.$elem.css({
                opacity: 0
            });
            this.orignalItems = this.options.items;
            this.checkBrowser();
            this.wrapperWidth = 0;
            this.checkVisible = null;
            this.setVars()
        },
        setVars: function() {
            if (0 === this.$elem.children().length) return !1;
            this.baseClass();
            this.eventTypes();
            this.$userItems = this.$elem.children();
            this.itemsAmount = this.$userItems.length;
            this.wrapItems();
            this.$owlItems = this.$elem.find(".owl-item");
            this.$owlWrapper = this.$elem.find(".owl-wrapper");
            this.playDirection = "next";
            this.prevItem = 0;
            this.prevArr = [0];
            this.currentItem = 0;
            this.customEvents();
            this.onStartup()
        },
        onStartup: function() {
            this.updateItems();
            this.calculateAll();
            this.buildControls();
            this.updateControls();
            this.response();
            this.moveEvents();
            this.stopOnHover();
            this.owlStatus();
            !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
            !0 === this.options.autoPlay && (this.options.autoPlay =
                5E3);
            this.play();
            this.$elem.find(".owl-wrapper").css("display", "block");
            this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
            this.onstartup = !1;
            this.eachMoveUpdate();
            "function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
        },
        eachMoveUpdate: function() {
            !0 === this.options.lazyLoad && this.lazyLoad();
            !0 === this.options.autoHeight && this.autoHeight();
            this.onVisibleItems();
            "function" === typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
        },
        updateVars: function() {
            "function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]);
            this.watchVisibility();
            this.updateItems();
            this.calculateAll();
            this.updatePosition();
            this.updateControls();
            this.eachMoveUpdate();
            "function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
        },
        reload: function() {
            var a = this;
            b.setTimeout(function() {
                a.updateVars()
            }, 0)
        },
        watchVisibility: function() {
            var a = this;
            if (!1 === a.$elem.is(":visible")) a.$elem.css({
                    opacity: 0
                }),
                b.clearInterval(a.autoPlayInterval), b.clearInterval(a.checkVisible);
            else return !1;
            a.checkVisible = b.setInterval(function() {
                a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
                    opacity: 1
                }, 200), b.clearInterval(a.checkVisible))
            }, 500)
        },
        wrapItems: function() {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
            this.$elem.css("display", "block")
        },
        baseClass: function() {
            var a = this.$elem.hasClass(this.options.baseClass),
                b = this.$elem.hasClass(this.options.theme);
            a || this.$elem.addClass(this.options.baseClass);
            b || this.$elem.addClass(this.options.theme)
        },
        updateItems: function() {
            var b, c;
            if (!1 === this.options.responsive) return !1;
            if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
            b = a(this.options.responsiveBaseWidth).width();
            b > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems);
            if (!1 !== this.options.itemsCustom)
                for (this.options.itemsCustom.sort(function(a, b) {
                        return a[0] - b[0]
                    }), c = 0; c < this.options.itemsCustom.length; c += 1) this.options.itemsCustom[c][0] <= b && (this.options.items = this.options.itemsCustom[c][1]);
            else b <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]),
                b <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), b <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), b <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), b <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount &&
                !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
        },
        response: function() {
            var c = this,
                d, f;
            if (!0 !== c.options.responsive) return !1;
            f = a(b).width();
            c.resizer = function() {
                a(b).width() !== f && (!1 !== c.options.autoPlay && b.clearInterval(c.autoPlayInterval), b.clearTimeout(d), d = b.setTimeout(function() {
                    f = a(b).width();
                    c.updateVars()
                }, c.options.responsiveRefreshRate))
            };
            a(b).resize(c.resizer)
        },
        updatePosition: function() {
            this.jumpTo(this.currentItem);
            !1 !== this.options.autoPlay && this.checkAp()
        },
        appendItemsSizes: function() {
            var b =
                this,
                c = 0,
                d = b.itemsAmount - b.options.items;
            b.$owlItems.each(function(g) {
                var h = a(this);
                h.css({
                    width: b.itemWidth
                }).data("owl-item", Number(g));
                if (0 === g % b.options.items || g === d) g > d || (c += 1);
                h.data("owl-roundPages", c)
            })
        },
        appendWrapperSizes: function() {
            this.$owlWrapper.css({
                width: this.$owlItems.length * this.itemWidth * 2,
                left: 0
            });
            this.appendItemsSizes()
        },
        calculateAll: function() {
            this.calculateWidth();
            this.appendWrapperSizes();
            this.loops();
            this.max()
        },
        calculateWidth: function() {
            this.itemWidth = Math.round(this.$elem.width() /
                this.options.items)
        },
        max: function() {
            var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = a);
            return a
        },
        min: function() {
            return 0
        },
        loops: function() {
            var b = 0,
                c = 0,
                d, g;
            this.positionsInArray = [0];
            this.pagesInArray = [];
            for (d = 0; d < this.itemsAmount; d += 1) c += this.itemWidth, this.positionsInArray.push(-c), !0 === this.options.scrollPerPage && (g = a(this.$owlItems[d]),
                g = g.data("owl-roundPages"), g !== b && (this.pagesInArray[b] = this.positionsInArray[d], b = g))
        },
        buildControls: function() {
            if (!0 === this.options.navigation || !0 === this.options.pagination) this.owlControls = a('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem);
            !0 === this.options.pagination && this.buildPagination();
            !0 === this.options.navigation && this.buildButtons()
        },
        buildButtons: function() {
            var b = this,
                c = a('<div class="owl-buttons"/>');
            b.owlControls.append(c);
            b.buttonPrev =
                a("<div/>", {
                    "class": "owl-prev",
                    html: b.options.navigationText[0] || ""
                });
            b.buttonNext = a("<div/>", {
                "class": "owl-next",
                html: b.options.navigationText[1] || ""
            });
            c.append(b.buttonPrev).append(b.buttonNext);
            c.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
                a.preventDefault()
            });
            c.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(c) {
                c.preventDefault();
                a(this).hasClass("owl-next") ? b.next() : b.prev()
            })
        },
        buildPagination: function() {
            var b = this;
            b.paginationWrapper =
                a('<div class="owl-pagination"/>');
            b.owlControls.append(b.paginationWrapper);
            b.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(c) {
                c.preventDefault();
                Number(a(this).data("owl-page")) !== b.currentItem && b.goTo(Number(a(this).data("owl-page")), !0)
            })
        },
        updatePagination: function() {
            var b, c, d, g, h, l;
            if (!1 === this.options.pagination) return !1;
            this.paginationWrapper.html("");
            b = 0;
            c = this.itemsAmount - this.itemsAmount % this.options.items;
            for (g = 0; g < this.itemsAmount; g += 1) 0 === g % this.options.items &&
                (b += 1, c === g && (d = this.itemsAmount - this.options.items), h = a("<div/>", {
                    "class": "owl-page"
                }), l = a("<span></span>", {
                    text: !0 === this.options.paginationNumbers ? b : "",
                    "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
                }), h.append(l), h.data("owl-page", c === g ? d : g), h.data("owl-roundPages", b), this.paginationWrapper.append(h));
            this.checkPagination()
        },
        checkPagination: function() {
            var b = this;
            if (!1 === b.options.pagination) return !1;
            b.paginationWrapper.find(".owl-page").each(function() {
                a(this).data("owl-roundPages") ===
                    a(b.$owlItems[b.currentItem]).data("owl-roundPages") && (b.paginationWrapper.find(".owl-page").removeClass("active"), a(this).addClass("active"))
            })
        },
        checkNavigation: function() {
            if (!1 === this.options.navigation) return !1;
            !1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem ===
                this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")))
        },
        updateControls: function() {
            this.updatePagination();
            this.checkNavigation();
            this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
        },
        destroyControls: function() {
            this.owlControls && this.owlControls.remove()
        },
        next: function(a) {
            if (this.isTransition) return !1;
            this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1;
            if (this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
                if (!0 === this.options.rewindNav) this.currentItem = 0, a = "rewind";
                else return this.currentItem = this.maximumItem, !1;
            this.goTo(this.currentItem, a)
        },
        prev: function(a) {
            if (this.isTransition) return !1;
            this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ?
                this.options.items : 1);
            if (0 > this.currentItem)
                if (!0 === this.options.rewindNav) this.currentItem = this.maximumItem, a = "rewind";
                else return this.currentItem = 0, !1;
            this.goTo(this.currentItem, a)
        },
        goTo: function(a, c, d) {
            var g = this;
            if (g.isTransition) return !1;
            "function" === typeof g.options.beforeMove && g.options.beforeMove.apply(this, [g.$elem]);
            a >= g.maximumItem ? a = g.maximumItem : 0 >= a && (a = 0);
            g.currentItem = g.owl.currentItem = a;
            if (!1 !== g.options.transitionStyle && "drag" !== d && 1 === g.options.items && !0 === g.browser.support3d) return g.swapSpeed(0), !0 === g.browser.support3d ? g.transition3d(g.positionsInArray[a]) : g.css2slide(g.positionsInArray[a], 1), g.afterGo(), g.singleItemTransition(), !1;
            a = g.positionsInArray[a];
            !0 === g.browser.support3d ? (g.isCss3Finish = !1, !0 === c ? (g.swapSpeed("paginationSpeed"), b.setTimeout(function() {
                g.isCss3Finish = !0
            }, g.options.paginationSpeed)) : "rewind" === c ? (g.swapSpeed(g.options.rewindSpeed), b.setTimeout(function() {
                g.isCss3Finish = !0
            }, g.options.rewindSpeed)) : (g.swapSpeed("slideSpeed"), b.setTimeout(function() {
                    g.isCss3Finish = !0
                },
                g.options.slideSpeed)), g.transition3d(a)) : !0 === c ? g.css2slide(a, g.options.paginationSpeed) : "rewind" === c ? g.css2slide(a, g.options.rewindSpeed) : g.css2slide(a, g.options.slideSpeed);
            g.afterGo()
        },
        jumpTo: function(a) {
            "function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]);
            a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0);
            this.swapSpeed(0);
            !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1);
            this.currentItem =
                this.owl.currentItem = a;
            this.afterGo()
        },
        afterGo: function() {
            this.prevArr.push(this.currentItem);
            this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
            this.prevArr.shift(0);
            this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
            "function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
        },
        stop: function() {
            this.apStatus = "stop";
            b.clearInterval(this.autoPlayInterval)
        },
        dragging: function(a) {
            this.options.dragging = a
        },
        checkAp: function() {
            "stop" !== this.apStatus && this.play()
        },
        play: function() {
            var a = this;
            a.apStatus = "play";
            if (!1 === a.options.autoPlay) return !1;
            b.clearInterval(a.autoPlayInterval);
            a.autoPlayInterval = b.setInterval(function() {
                a.next(!0)
            }, a.options.autoPlay)
        },
        swapSpeed: function(a) {
            "slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" !==
                typeof a && this.$owlWrapper.css(this.addCssSpeed(a))
        },
        addCssSpeed: function(a) {
            return {
                "-webkit-transition": "all " + a + "ms ease",
                "-moz-transition": "all " + a + "ms ease",
                "-o-transition": "all " + a + "ms ease",
                transition: "all " + a + "ms ease"
            }
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            }
        },
        doTranslate: function(a) {
            return {
                "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-o-transform": "translate3d(" +
                    a + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + a + "px, 0px, 0px)",
                transform: "translate3d(" + a + "px, 0px,0px)"
            }
        },
        transition3d: function(a) {
            this.$owlWrapper.css(this.doTranslate(a))
        },
        css2move: function(a) {
            this.$owlWrapper.css({
                left: a
            })
        },
        css2slide: function(a, b) {
            var c = this;
            c.isCssFinish = !1;
            c.$owlWrapper.stop(!0, !0).animate({
                left: a
            }, {
                duration: b || c.options.slideSpeed,
                complete: function() {
                    c.isCssFinish = !0
                }
            })
        },
        checkBrowser: function() {
            var a = c.createElement("div");
            a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
            this.browser = {
                support3d: null !== a && 1 === a.length,
                isTouch: "ontouchstart" in b || b.navigator.msMaxTouchPoints
            }
        },
        moveEvents: function() {
            if (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), this.disabledEvents()
        },
        eventTypes: function() {
            var a = ["s", "e", "x"];
            this.ev_types = {};
            !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] :
                !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]);
            this.ev_types.start = a[0];
            this.ev_types.move = a[1];
            this.ev_types.end = a[2]
        },
        disabledEvents: function() {
            this.$elem.on("dragstart.owl", function(a) {
                a.preventDefault()
            });
            this.$elem.on("mousedown.disableTextSelect", function(b) {
                return a(b.target).is("input, textarea, select, option")
            })
        },
        gestures: function() {
            function d(a) {
                if (void 0 !== a.touches) return {
                    x: a.touches[0].pageX,
                    y: a.touches[0].pageY
                };
                if (void 0 === a.touches) {
                    if (void 0 !== a.pageX) return {
                        x: a.pageX,
                        y: a.pageY
                    };
                    if (void 0 === a.pageX) return {
                        x: a.clientX,
                        y: a.clientY
                    }
                }
            }

            function k(b) {
                "on" === b ? (a(c).on(h.ev_types.move, f), a(c).on(h.ev_types.end, g)) : "off" === b && (a(c).off(h.ev_types.move), a(c).off(h.ev_types.end))
            }

            function f(f) {
                h.options.dragging && (f = f.originalEvent || f || b.event, h.newPosX = d(f).x - l.offsetX, h.newPosY = d(f).y - l.offsetY, h.newRelativeX =
                    h.newPosX - l.relativePos, "function" === typeof h.options.startDragging && !0 !== l.dragging && 0 !== h.newRelativeX && (l.dragging = !0, h.options.startDragging.apply(h, [h.$elem])), (8 < h.newRelativeX || -8 > h.newRelativeX) && !0 === h.browser.isTouch && (void 0 !== f.preventDefault ? f.preventDefault() : f.returnValue = !1, l.sliding = !0), (10 < h.newPosY || -10 > h.newPosY) && !1 === l.sliding && a(c).off("touchmove.owl"), h.newPosX = Math.max(Math.min(h.newPosX, h.newRelativeX / 5), h.maximumPixels + h.newRelativeX / 5), !0 === h.browser.support3d ? h.transition3d(h.newPosX) :
                    h.css2move(h.newPosX))
            }

            function g(c) {
                c = c.originalEvent || c || b.event;
                var d;
                c.target = c.target || c.srcElement;
                l.dragging = !1;
                !0 !== h.browser.isTouch && h.$owlWrapper.removeClass("grabbing");
                h.dragDirection = 50 > h.newRelativeX ? h.owl.dragDirection = "left" : h.owl.dragDirection = "right";
                0 !== h.newRelativeX && (d = h.getNewPosition(), h.goTo(d, !1, "drag"), l.targetElement === c.target && !0 !== h.browser.isTouch && (a(c.target).on("click.disable", function(b) {
                        b.stopImmediatePropagation();
                        b.stopPropagation();
                        b.preventDefault();
                        a(b.target).off("click.disable")
                    }),
                    c = a._data(c.target, "events").click, d = c.pop(), c.splice(0, 0, d)));
                k("off")
            }
            var h = this,
                l = {
                    offsetX: 0,
                    offsetY: 0,
                    baseElWidth: 0,
                    relativePos: 0,
                    position: null,
                    minSwipe: null,
                    maxSwipe: null,
                    sliding: null,
                    dargging: null,
                    targetElement: null
                };
            h.isCssFinish = !0;
            h.$elem.on(h.ev_types.start, ".owl-wrapper", function(c) {
                c = c.originalEvent || c || b.event;
                var f;
                if (h.options.dragging) {
                    if (3 === c.which) return !1;
                    if (!(h.itemsAmount <= h.options.items)) {
                        if (!1 === h.isCssFinish && !h.options.dragBeforeAnimFinish || !1 === h.isCss3Finish && !h.options.dragBeforeAnimFinish) return !1;
                        !1 !== h.options.autoPlay && b.clearInterval(h.autoPlayInterval);
                        !0 === h.browser.isTouch || h.$owlWrapper.hasClass("grabbing") || h.$owlWrapper.addClass("grabbing");
                        h.newPosX = 0;
                        h.newRelativeX = 0;
                        a(this).css(h.removeTransition());
                        f = a(this).position();
                        l.relativePos = f.left;
                        l.offsetX = d(c).x - f.left;
                        l.offsetY = d(c).y - f.top;
                        k("on");
                        l.sliding = !1;
                        l.targetElement = c.target || c.srcElement
                    }
                }
            })
        },
        getNewPosition: function() {
            var a = this.closestItem();
            a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem =
                a = 0);
            return a
        },
        closestItem: function() {
            var b = this,
                c = !0 === b.options.scrollPerPage ? b.pagesInArray : b.positionsInArray,
                d = b.newPosX,
                g = null;
            a.each(c, function(h, l) {
                d - b.itemWidth / 20 > c[h + 1] && d - b.itemWidth / 20 < l && "left" === b.moveDirection() ? (g = l, b.currentItem = !0 === b.options.scrollPerPage ? a.inArray(g, b.positionsInArray) : h) : d + b.itemWidth / 20 < l && d + b.itemWidth / 20 > (c[h + 1] || c[h] - b.itemWidth) && "right" === b.moveDirection() && (!0 === b.options.scrollPerPage ? (g = c[h + 1] || c[c.length - 1], b.currentItem = a.inArray(g, b.positionsInArray)) :
                    (g = c[h + 1], b.currentItem = h + 1))
            });
            return b.currentItem
        },
        moveDirection: function() {
            var a;
            0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", this.playDirection = "prev");
            return a
        },
        customEvents: function() {
            var a = this;
            a.$elem.on("owl.next", function() {
                a.next()
            });
            a.$elem.on("owl.prev", function() {
                a.prev()
            });
            a.$elem.on("owl.play", function(b, c) {
                a.options.autoPlay = c;
                a.play();
                a.hoverStatus = "play"
            });
            a.$elem.on("owl.stop", function() {
                a.stop();
                a.hoverStatus = "stop"
            });
            a.$elem.on("owl.goTo", function(b, c) {
                a.goTo(c)
            });
            a.$elem.on("owl.jumpTo", function(b, c) {
                a.jumpTo(c)
            });
            a.$elem.on("owl.dragging", function(b, c) {
                a.dragging(c)
            })
        },
        stopOnHover: function() {
            var a = this;
            !0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function() {
                a.stop()
            }), a.$elem.on("mouseout", function() {
                "stop" !== a.hoverStatus && a.play()
            }))
        },
        lazyLoad: function() {
            var b = this,
                c, d, g, h, l;
            if (!1 === b.options.lazyLoad) return !1;
            for (c = 0; c < b.itemsAmount; c += 1) d = a(b.$owlItems[c]), "loaded" !== d.data("owl-loaded") && (g = d.data("owl-item"),
                h = d.find(".lazyOwl"), "string" !== typeof h.data("src") ? d.data("owl-loaded", "loaded") : (void 0 === d.data("owl-loaded") && (h.hide(), d.addClass("loading").data("owl-loaded", "checked")), (l = !0 === b.options.lazyFollow ? g >= b.currentItem : !0) && g < b.currentItem + b.options.items && h.length && h.each(function() {
                    b.lazyPreload(d, a(this))
                })))
        },
        lazyPreload: function(a, c) {
            function d() {
                a.data("owl-loaded", "loaded").removeClass("loading");
                c.removeAttr("data-src");
                "fade" === h.options.lazyEffect ? c.fadeIn(400) : c.show();
                "function" ===
                typeof h.options.afterLazyLoad && h.options.afterLazyLoad.apply(this, [h.$elem])
            }

            function g() {
                l += 1;
                h.completeImg(c.get(0)) || !0 === m ? d() : 100 >= l ? b.setTimeout(g, 100) : d()
            }
            var h = this,
                l = 0,
                m;
            "DIV" === c.prop("tagName") ? (c.css("background-image", "url(" + c.data("src") + ")"), m = !0) : c[0].src = c.data("src");
            g()
        },
        autoHeight: function() {
            function c() {
                var d = a(f.$owlItems[f.currentItem]).height();
                f.wrapperOuter.css("height", d + "px");
                f.wrapperOuter.hasClass("autoHeight") || b.setTimeout(function() {
                        f.wrapperOuter.addClass("autoHeight")
                    },
                    0)
            }

            function d() {
                h += 1;
                f.completeImg(g.get(0)) ? c() : 100 >= h ? b.setTimeout(d, 100) : f.wrapperOuter.css("height", "")
            }
            var f = this,
                g = a(f.$owlItems[f.currentItem]).find("img"),
                h;
            void 0 !== g.get(0) ? (h = 0, d()) : c()
        },
        completeImg: function(a) {
            return !a.complete || "undefined" !== typeof a.naturalWidth && 0 === a.naturalWidth ? !1 : !0
        },
        onVisibleItems: function() {
            var b;
            !0 === this.options.addClassActive && this.$owlItems.removeClass("active");
            this.visibleItems = [];
            for (b = this.currentItem; b < this.currentItem + this.options.items; b += 1) this.visibleItems.push(b), !0 === this.options.addClassActive && a(this.$owlItems[b]).addClass("active");
            this.owl.visibleItems = this.visibleItems
        },
        transitionTypes: function(a) {
            this.outClass = "owl-" + a + "-out";
            this.inClass = "owl-" + a + "-in"
        },
        singleItemTransition: function() {
            var a = this,
                b = a.outClass,
                c = a.inClass,
                d = a.$owlItems.eq(a.currentItem),
                h = a.$owlItems.eq(a.prevItem),
                l = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],
                m = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
            a.isTransition = !0;
            a.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": m +
                    "px",
                "-moz-perspective-origin": m + "px",
                "perspective-origin": m + "px"
            });
            h.css({
                position: "relative",
                left: l + "px"
            }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endPrev = !0;
                h.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(h, b)
            });
            d.addClass(c).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endCurrent = !0;
                d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(d,
                    c)
            })
        },
        clearTransStyle: function(a, b) {
            a.css({
                position: "",
                left: ""
            }).removeClass(b);
            this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
        },
        owlStatus: function() {
            this.owl = {
                userOptions: this.userOptions,
                baseElement: this.$elem,
                userItems: this.$userItems,
                owlItems: this.$owlItems,
                currentItem: this.currentItem,
                prevItem: this.prevItem,
                visibleItems: this.visibleItems,
                isTouch: this.browser.isTouch,
                browser: this.browser,
                dragDirection: this.dragDirection
            }
        },
        clearEvents: function() {
            this.$elem.off(".owl owl mousedown.disableTextSelect");
            a(c).off(".owl owl");
            a(b).off("resize", this.resizer)
        },
        unWrap: function() {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove());
            this.clearEvents();
            this.$elem.attr({
                style: this.$elem.data("owl-originalStyles") || "",
                class: this.$elem.data("owl-originalClasses")
            })
        },
        destroy: function() {
            this.stop();
            b.clearInterval(this.checkVisible);
            this.unWrap();
            this.$elem.removeData()
        },
        reinit: function(b) {
            b = a.extend({}, this.userOptions, b);
            this.unWrap();
            this.init(b, this.$elem)
        },
        addItem: function(a, b) {
            var c;
            if (!a) return !1;
            if (0 === this.$elem.children().length) return this.$elem.append(a), this.setVars(), !1;
            this.unWrap();
            c = void 0 === b || -1 === b ? -1 : b;
            c >= this.$userItems.length || -1 === c ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(c).before(a);
            this.setVars()
        },
        removeItem: function(a) {
            if (0 === this.$elem.children().length) return !1;
            a = void 0 === a || -1 === a ? -1 : a;
            this.unWrap();
            this.$userItems.eq(a).remove();
            this.setVars()
        }
    };
    a.fn.owlCarousel = function(b) {
        return this.each(function() {
            if (!0 === a(this).data("owl-init")) return !1;
            a(this).data("owl-init", !0);
            var c = Object.create(d);
            c.init(b, this);
            a.data(this, "owlCarousel", c)
        })
    };
    a.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1E3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: b,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        dragging: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
})(jQuery, window, document);
ACC.cart = {
    _autoload: ["bindHelp"],
    bindHelp: function() {
        $(document).on("click", ".js-cart-help", function(a) {
            a.preventDefault();
            a = $(this).data("help");
            ACC.colorbox.open(a, {
                html: $(".js-help-popup-content").html(),
                width: "300px"
            })
        })
    }
};
$("div.departmenthover").on("mouseover touchend", function() {
    var a = this.id,
        b = a.substring(4);
    if (!$.cookie("dept-list") && window.localStorage)
        for (var c in localStorage) 0 <= c.indexOf("deptmenuhtml") && window.localStorage.removeItem(c);
    window.localStorage && (html = window.localStorage.getItem("deptmenuhtml-" + b)) && "" != html ? $("ul." + a).html(decodeURI(html)) : $.ajax({
        url: ACC.config.encodedContextPath + "/departmentCollection",
        type: "GET",
        data: "&department=" + b,
        success: function(c) {
            $("ul." + a).html(c);
            window.localStorage &&
                ($.cookie("dept-list", "true", {
                    expires: 1,
                    path: "/store"
                }), window.localStorage.setItem("deptmenuhtml-" + b, encodeURI(c)))
        }
    })
});
$(".A-ZBrands").on("mouseover touchend", function(a) {
    if ($("li#atozbrandsdiplay").length) {
        if (!$.cookie("dept-list") && window.localStorage)
            for (var b in localStorage) 0 <= b.indexOf("atozbrandmenuhtml") && window.localStorage.removeItem(b);
        window.localStorage && (html = window.localStorage.getItem("atozbrandmenuhtml")) && "" != html ? null != $("div#appendedAtoZBrands") && 0 != $("div#appendedAtoZBrands").length || $("li#atozbrandsdiplay").append(decodeURI(html)) : $.ajax({
            url: ACC.config.encodedContextPath + "/atozbrands",
            type: "GET",
            success: function(a) {
                console.log(a);
                null != $("div#appendedAtoZBrands") && 0 != $("div#appendedAtoZBrands").length || $("li#atozbrandsdiplay").append(a);
                window.localStorage && ($.cookie("dept-list", "true", {
                    expires: 1,
                    path: "/store"
                }), window.localStorage.setItem("atozbrandmenuhtml", encodeURI(a)))
            }
        })
    }
});
$("span.helpmeshopbanner").on("click touchend", function() {
    $.ajax({
        url: ACC.config.encodedContextPath + "/helpmeshop",
        type: "GET",
        success: function(a) {
            $("div#helpmeshopcontent").html(a)
        }
    })
});
$("a#tracklink").on("mouseover touchend", function(a) {
    a.stopPropagation();
    $.ajax({
        url: ACC.config.encodedContextPath + "/headerTrackOrder",
        type: "GET",
        success: function(a) {
            $("ul.trackorder-dropdown").html(a)
        }
    })
});
$("a#myWishlistHeader").on("mouseover touchend", function(a) {
    a.stopPropagation();
    $.ajax({
        url: ACC.config.encodedContextPath + "/headerWishlist",
        type: "GET",
        data: "&productCount=" + $(this).attr("data-count"),
        success: function(a) {
            $("div.wishlist-info").html(a)
        }
    })
});
var activePos = 0;
$(window).on("resize load", function() {
    activePos = 790 < $(window).width() ? 3 : 1
});

function getBrandsYouLoveAjaxCall() {
    var a = "true" == $("#previewVersion").val() ? "version=Staged" : "version=Online";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: ACC.config.encodedContextPath + "/getBrandsYouLove",
        data: a,
        success: function(a) {
            console.log(a.subComponents);
            defaultComponentId = "";
            renderHtml = "<h1>" + a.title + "</h1><div class='home-brands-you-love-carousel'>";
            $.each(a.subComponents, function(a, b) {
                console.log(b.brandLogoUrl);
                b.showByDefault ? (renderHtml += "<div class='home-brands-you-love-carousel-brands item active' id='" +
                    b.compId + "'><img src='" + b.brandLogoUrl + "'></img></div>", defaultComponentId = b.compId) : renderHtml += "<div class='home-brands-you-love-carousel-brands item' id='" + b.compId + "'><img src='" + b.brandLogoUrl + "'></img></div>"
            });
            renderHtml += "</div>";
            renderHtml += '<div class="bulprev"></div><div class="bulnext"></div>';
            $("#brandsYouLove").html(renderHtml);
            getBrandsYouLoveContentAjaxCall(defaultComponentId)
        },
        error: function() {
            console.log("Error while getting brands you love")
        },
        complete: function() {
            $(".home-brands-you-love-carousel").owlCarousel({
                navigation: !1,
                navigationText: [],
                pagination: !1,
                itemsDesktop: [5E3, 7],
                itemsDesktopSmall: [1400, 7],
                itemsTablet: [790, 3],
                itemsMobile: [480, 3],
                rewindNav: !1,
                lazyLoad: !1,
                mouseDrag: !1,
                touchDrag: !1
            });
            var a = $(".home-brands-you-love-carousel-brands.active").parents(".owl-item").index();
            if (a > activePos)
                for (var c = 0; c < a - activePos; c++) $(".home-brands-you-love-carousel .owl-wrapper").append($(".home-brands-you-love-carousel .owl-item").first());
            else if (a < activePos)
                for (c = 0; c < activePos - a; c++) $(".home-brands-you-love-carousel .owl-wrapper").prepend($(".home-brands-you-love-carousel .owl-item").last())
        }
    })
}

function getBrandsYouLoveContentAjaxCall(a) {
    window.localStorage && (html = window.localStorage.getItem("brandContent-" + a)) && "" != html ? ($(".home-brands-you-love-carousel").css("margin-bottom", "20px"), $(".home-brands-you-love-desc").remove(), $("#brandsYouLove").append(decodeURI(html))) : $.ajax({
        type: "GET",
        dataType: "json",
        beforeSend: function() {
            $(".home-brands-you-love-carousel").css("margin-bottom", "120px");
            $("#brandsYouLove").append("<div class='loaderDiv' style='background: transparent;z-index: 100000;position: absolute; top: 200px;left: 50%;margin-left: -50px;display:inline-block;width:100px;height:100px;'><img src='/store/_ui/desktop/theme-blue/images/loading.gif' style='width:100%;'/></div>")
        },
        url: ACC.config.encodedContextPath + "/getBrandsYouLoveContent",
        data: {
            id: a
        },
        success: function(b) {
            $(".home-brands-you-love-desc").remove();
            defaultHtml = "<div class='home-brands-you-love-desc'>";
            "undefined" !== typeof b.text && (defaultHtml += b.text);
            "undefined" !== typeof b.firstProductImageUrl && (defaultHtml += "<div class='home-brands-you-love-side-image left'><a href='" + ACC.config.encodedContextPath + b.firstProductUrl + "'><img src='" + b.firstProductImageUrl + "'></img>", "undefined" !== typeof b.firstProductTitle && (defaultHtml +=
                "<p class='product-name'>" + b.firstProductTitle + "</p>"), "undefined" !== typeof b.firstProductPrice && (defaultHtml += "<p class='price normal'><span class='priceFormat'>" + b.firstProductPrice + "</span></p>"), defaultHtml += "</a></div>");
            defaultHtml += "<div class='home-brands-you-love-main-image'>";
            "undefined" !== typeof b.bannerImageUrl && (defaultHtml += "<div class='home-brands-you-love-main-image-wrapper'>", "undefined" !== typeof b.bannerText && (defaultHtml += "<div class='visit-store-wrapper'>" + b.bannerText + "</div>"),
                defaultHtml += "<img src='" + b.bannerImageUrl + "'></img></div></div>");
            "undefined" !== typeof b.secondproductImageUrl && (defaultHtml += "<div class='home-brands-you-love-side-image right'><a href='" + ACC.config.encodedContextPath + b.secondProductUrl + "'><img src='" + b.secondproductImageUrl + "'></img>", "undefined" !== typeof b.secondProductTitle && (defaultHtml += "<p class='product-name'>" + b.secondProductTitle + "</p>"), "undefined" !== typeof b.secondProductPrice && (defaultHtml += "<p class='normal price'><span class='priceFormat'>" +
                b.secondProductPrice + "</span></p>"), defaultHtml += "</a></div>");
            defaultHtml += "</div>";
            $(".home-brands-you-love-carousel").css("margin-bottom", "20px");
            $("#brandsYouLove").append(defaultHtml);
            window.localStorage.setItem("brandContent-" + a, encodeURI(defaultHtml))
        },
        complete: function() {
            $("#brandsYouLove .loaderDiv").remove()
        },
        error: function() {
            $("#brandsYouLove .loaderDiv").remove();
            $(".home-brands-you-love-carousel").css("margin-bottom", "20px");
            console.log("Error while getting brands you love content")
        }
    })
}
if (0 == $("#brandsYouLove").children().length && "homepage" == $("#ia_site_page_id").val()) {
    if (window.localStorage)
        for (var key in localStorage) 0 <= key.indexOf("brandContent") && (window.localStorage.removeItem(key), console.log("Deleting.." + key));
    getBrandsYouLoveAjaxCall()
}
var bulCount = $(".home-brands-you-love-carousel-brands.active").index() - 1;
$(document).on("click", ".home-brands-you-love-carousel-brands", function() {
    $(".home-brands-you-love-carousel-brands").removeClass("active");
    $(this).addClass("active");
    $(".home-brands-you-love-desc").remove();
    var a = $(".home-brands-you-love-carousel .owl-item").outerWidth(),
        b = $(this).parents(".owl-item").index();
    if (b > activePos)
        for (var c = 0; c < b - activePos; c++) $("#brandsYouLove .owl-wrapper").css("transition", "all 0.2s linear"), $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(-" + a + "px, 0px, 0px)"),
            setTimeout(function() {
                $(".home-brands-you-love-carousel .owl-wrapper").append($(".home-brands-you-love-carousel .owl-item").first());
                $("#brandsYouLove .owl-wrapper").css("transition", "all 0s linear");
                $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(0px, 0px, 0px)")
            }, 200);
    else if (b < activePos)
        for (c = 0; c < activePos - b; c++) $("#brandsYouLove .owl-wrapper").css("transition", "all 0.2s linear"), $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(" + a + "px, 0px, 0px)"), setTimeout(function() {
            $(".home-brands-you-love-carousel .owl-wrapper").prepend($(".home-brands-you-love-carousel .owl-item").last());
            $("#brandsYouLove .owl-wrapper").css("transition", "all 0s linear");
            $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(0px, 0px, 0px)")
        }, 200);
    b = $(this).parents(".owl-item").index();
    getBrandsYouLoveContentAjaxCall($(this).attr("id"))
});
$(document).on("click", ".bulprev", function() {
    var a = $(".home-brands-you-love-carousel .owl-item").outerWidth();
    $(".home-brands-you-love-desc").remove();
    $("#brandsYouLove .owl-wrapper").css("transition", "all 0.3s ease");
    $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(" + a + "px, 0px, 0px)");
    setTimeout(function() {
        $(".home-brands-you-love-carousel .owl-wrapper").prepend($(".home-brands-you-love-carousel .owl-item").last());
        $(".home-brands-you-love-carousel .home-brands-you-love-carousel-brands").removeClass("active");
        $(".home-brands-you-love-carousel .home-brands-you-love-carousel-brands").eq(activePos).addClass("active");
        getBrandsYouLoveContentAjaxCall($(".home-brands-you-love-carousel-brands.active").attr("id"));
        $("#brandsYouLove .owl-wrapper").css("transition", "all 0s ease");
        $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(0px, 0px, 0px)")
    }, 300)
});
$(document).on("click", ".bulnext", function() {
    var a = $(".home-brands-you-love-carousel .owl-item").outerWidth();
    $(".home-brands-you-love-desc").remove();
    $("#brandsYouLove .owl-wrapper").css("transition", "all 0.3s ease");
    $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(-" + a + "px, 0px, 0px)");
    setTimeout(function() {
        $(".home-brands-you-love-carousel .owl-wrapper").append($(".home-brands-you-love-carousel .owl-item").first());
        $(".home-brands-you-love-carousel .home-brands-you-love-carousel-brands").removeClass("active");
        $(".home-brands-you-love-carousel .home-brands-you-love-carousel-brands").eq(activePos).addClass("active");
        getBrandsYouLoveContentAjaxCall($(".home-brands-you-love-carousel-brands.active").attr("id"));
        $("#brandsYouLove .owl-wrapper").css("transition", "all 0s ease");
        $("#brandsYouLove .owl-wrapper").css("transform", "translate3d(0px, 0px, 0px)")
    }, 300)
});
$("#ia_site_page_id").val();
0 == $("#bestPicks").children().length && "homepage" == $("#ia_site_page_id").val() && getBestPicksAjaxCall();

function getBestPicksAjaxCall() {
    var a = "true" == $("#previewVersion").val() ? "version=Staged" : "version=Online";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: ACC.config.encodedContextPath + "/getBestPicks",
        data: a,
        success: function(a) {
            renderHtml = "<h1>" + a.title + "</h1><div class='home-best-pick-carousel'>";
            $.each(a.subItems, function(a, b) {
                b.url && (renderHtml += "<a href='" + b.url + "' class='item'>");
                b.imageUrl && (renderHtml += "<div class='home-best-pick-carousel-img'> <img src='" + b.imageUrl + "'></img></div>");
                b.text && (renderHtml +=
                    "<div class='short-info'>" + b.text + "</div>");
                renderHtml += "</a>"
            });
            renderHtml += "</div> <a href='/store/o/all' class='view-cliq-offers'> View Cliq Offers </a>";
            $("#bestPicks").html(renderHtml)
        },
        error: function() {
            console.log("Error while getting best picks")
        },
        complete: function() {
            $(".home-best-pick-carousel").owlCarousel({
                navigation: !0,
                navigationText: [],
                pagination: !1,
                itemsDesktop: [5E3, 5],
                itemsDesktopSmall: [1400, 5],
                itemsTablet: [650, 1],
                itemsMobile: [480, 1],
                rewindNav: !1,
                lazyLoad: !0,
                scrollPerPage: !0
            })
        }
    })
}
0 == $("#productYouCare").children().length && "homepage" == $("#ia_site_page_id").val() && getProductsYouCareAjaxCall();

function getProductsYouCareAjaxCall() {
    var a = "true" == $("#previewVersion").val() ? "version=Staged" : "version=Online";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: ACC.config.encodedContextPath + "/getProductsYouCare",
        data: a,
        success: function(a) {
            renderHtml = "<h1>" + a.title + "</h1>";
            renderHtml += "<div class='home-product-you-care-carousel'>";
            $.each(a.categories, function(a, b) {
                console.log("Category name: " + b.categoryName);
                console.log("Category code: " + b.categoryCode);
                console.log("Category media url: " + b.mediaURL);
                renderHtml +=
                    "<a href='" + (ACC.config.encodedContextPath + "/Categories/" + b.categoryName + "/c/" + b.categoryCode) + "' class='item'>";
                renderHtml += "<div class='home-product-you-care-carousel-img'> <img src='" + b.mediaURL + "'></img></div>";
                renderHtml += "<div class='short-info'><h3 class='product-name'><span>" + b.categoryName + "</span></h3></div>";
                renderHtml += "</a>"
            });
            renderHtml += "</div>";
            $("#productYouCare").html(renderHtml)
        },
        error: function() {
            console.log("Error while getting getProductsYouCare")
        },
        complete: function() {
            $(".home-product-you-care-carousel").owlCarousel({
                navigation: !0,
                navigationText: [],
                pagination: !1,
                itemsDesktop: [5E3, 4],
                itemsDesktopSmall: [1400, 4],
                itemsTablet: [650, 2],
                itemsMobile: [480, 2],
                rewindNav: !1,
                lazyLoad: !0,
                scrollPerPage: !0
            })
        }
    })
}

function getNewAndExclusiveAjaxCall() {
    var a = "true" == $("#previewVersion").val() ? "version=Staged" : "version=Online";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: ACC.config.encodedContextPath + "/getNewAndExclusive",
        data: a,
        success: function(a) {
            console.log(a.newAndExclusiveProducts);
            renderHtml = "<h1>" + a.title + "</h1><div class='carousel js-owl-carousel js-owl-lazy-reference js-owl-carousel-reference' id='new_exclusive'>";
            $.each(a.newAndExclusiveProducts, function(a, b) {
                renderHtml += "<div class='item slide'><div class='newExclusiveElement'><a href='" +
                    ACC.config.encodedContextPath + b.productUrl + "'><img src='" + b.productImageUrl + "'></img><p class='New_Exclusive_title'>" + b.productTitle + "</p><p class='New_Exclusive_title'><span class='priceFormat'>" + b.productPrice + "</span></p></a></div></div>"
            });
            renderHtml += "</div><a href='" + ACC.config.encodedContextPath + "/search/viewOnlineProducts' class='new_exclusive_viewAll'>View All</a>";
            $("#newAndExclusive").html(renderHtml)
        },
        error: function() {
            console.log("Error while getting new and exclusive")
        },
        complete: function() {
            $("#new_exclusive").owlCarousel({
                navigation: !0,
                rewindNav: !1,
                navigationText: [],
                pagination: !1,
                items: 2,
                itemsDesktop: !1,
                itemsDesktopSmall: !1,
                itemsTablet: !1,
                itemsMobile: !1,
                scrollPerPage: !0
            });
            setTimeout(function() {
                773 < $(window).width() && ($("#newAndExclusive").height() > $("#stayQued").height() ? $("#stayQued").css("min-height", $("#newAndExclusive").outerHeight() + "px") : $("#newAndExclusive").css("min-height", $("#stayQued").outerHeight() + "px"))
            }, 2500)
        }
    })
}
0 == $("#newAndExclusive").children().length && "homepage" == $("#ia_site_page_id").val() && getNewAndExclusiveAjaxCall();

function getPromoBannerHomepage() {
    var a = "true" == $("#previewVersion").val() ? "version=Staged" : "version=Online";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: ACC.config.encodedContextPath + "/getPromoBannerHomepage",
        data: a,
        success: function(a) {
            console.log(a.bannerImage);
            renderHtml = a.promoText1;
            $("#promobannerhomepage").html(renderHtml)
        },
        error: function() {
            console.log("Failure in Promo!!!")
        }
    })
}
0 == $("#promobannerhomepage").children().length && "homepage" == $("#ia_site_page_id").val() && getPromoBannerHomepage();

function getStayQuedHomepage() {
    var a = "true" == $("#previewVersion").val() ? "version=Staged" : "version=Online";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: ACC.config.encodedContextPath + "/getStayQuedHomepage",
        data: a,
        success: function(a) {
            console.log(a.bannerImage);
            var c = "",
                d = a.bannerUrlLink,
                e = a.bannerImage,
                k = a.promoText1;
            a = a.promoText2;
            c = $(a).is("p") ? $(a).text() : a;
            renderHtml = '<h1><span></span><span class="h1-qued">Stay Qued</span></h1><div class="qued-content">' + k + '<a href="' + ACC.config.encodedContextPath + d + '" class="button maroon">' +
                c + '</a></div><div class="qued-image"><img src="' + e + '" class="img-responsive"></div>';
            $("#stayQued").html(renderHtml)
        },
        error: function() {
            console.log("Failure in StayQued!!!")
        }
    })
}
0 == $("#stayQued").children().length && "homepage" == $("#ia_site_page_id").val() && getStayQuedHomepage();
if (0 == $("#showcase").children().length && "homepage" == $("#ia_site_page_id").val()) {
    if (window.localStorage)
        for (key in localStorage) 0 <= key.indexOf("showcaseContent") && (window.localStorage.removeItem(key), console.log("Deleting.." + key));
    getShowCaseAjaxCall()
}

function getShowCaseAjaxCall() {
    var a = "true" == $("#previewVersion").val() ? "version=Staged" : "version=Online";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: ACC.config.encodedContextPath + "/getCollectionShowcase",
        data: a,
        success: function(a) {
            console.log(a.subComponents);
            defaultComponentId = "";
            renderHtml = "<h1>" + a.title + "</h1><div class='showcase-heading showcase-switch'>";
            $.each(a.subComponents, function(a, b) {
                b.showByDefault ? (renderHtml += "<div class='showcaseItem'><a id='" + b.compId + "' class='showcase-border'>" + b.headerText +
                    "</a></div>", defaultComponentId = b.compId) : renderHtml += "<div class='showcaseItem'><a id='" + b.compId + "'>" + b.headerText + "</a></div>"
            });
            renderHtml += "</div>";
            $("#showcase").html(renderHtml);
            getShowcaseContentAjaxCall(defaultComponentId)
        },
        error: function() {
            console.log("Error while getting showcase")
        }
    })
}

function getShowcaseContentAjaxCall(a) {
    window.localStorage && (html = window.localStorage.getItem("showcaseContent-" + a)) && "" != html ? ($(".about-one showcase-section").remove(), $("#showcase").append(decodeURI(html))) : $.ajax({
        type: "GET",
        dataType: "json",
        beforeSend: function() {
            $(".showcase-switch").css("margin-bottom", "80px");
            $("#showcase").append("<div class='loaderDiv' style='background: transparent;z-index: 100000;position: absolute; top: 150px;left: 50%;margin-left: -50px;display:inline-block;width:100px;height:100px;'><img src='/store/_ui/desktop/theme-blue/images/loading.gif' style='width:100%;'/></div>")
        },
        url: ACC.config.encodedContextPath + "/getShowcaseContent",
        data: {
            id: a
        },
        success: function(b) {
            $(".about-one.showcase-section").remove();
            defaultHtml = "<div class='about-one showcase-section'>";
            "undefined" !== typeof b.bannerImageUrl && (defaultHtml += "<div class='desc-section'>", "undefined" !== typeof b.bannerUrl && (defaultHtml += "<a href='" + ACC.config.encodedContextPath + b.bannerUrl + "'>"), defaultHtml += "<img src='" + b.bannerImageUrl + "'></img>", "undefined" !== typeof b.bannerUrl && (defaultHtml += "</a>"), defaultHtml += "</div>");
            "undefined" !== typeof b.text && (defaultHtml += "<div class='desc-section'>" + b.text + "</div>");
            "undefined" !== typeof b.firstProductImageUrl && (defaultHtml += " <div class='desc-section'><a href='" + ACC.config.encodedContextPath + b.firstProductUrl + "'><img src='" + b.firstProductImageUrl + "'></img>", defaultHtml += "<div class='showcase-center'>", "undefined" !== typeof b.firstProductTitle && (defaultHtml += "<h3 class='product-name'>" + b.firstProductTitle + "</h3>"), "undefined" !== typeof b.firstProductPrice && (defaultHtml += "<div class='price'><p class='normal'><span class='priceFormat'>" +
                b.firstProductPrice + "</span></p></div>"), defaultHtml += "</a></div>");
            defaultHtml += "</div>";
            $("#showcase .loaderDiv").remove();
            $(".showcase-switch").css("margin-bottom", "0px");
            $("#showcase").append(defaultHtml);
            window.localStorage.setItem("showcaseContent-" + a, encodeURI(defaultHtml))
        },
        error: function() {
            console.log("Error while getting showcase content");
            $("#showcase .loaderDiv").remove();
            $(".showcase-switch").css("margin-bottom", "0px")
        }
    })
}
$(document).on("click", ".showcaseItem", function() {
    var a = $(this).find("a").attr("id");
    $(".showcaseItem").find("a").removeClass("showcase-border");
    $(this).find("a").addClass("showcase-border");
    $(".about-one.showcase-section").remove();
    getShowcaseContentAjaxCall(a)
});
$(window).on("resize", function() {
    773 < $(window).width() ? $("#newAndExclusive").height() > $("#stayQued").height() ? $("#stayQued").css("min-height", $("#newAndExclusive").outerHeight() + "px") : $("#newAndExclusive").css("min-height", $("#stayQued").outerHeight() + "px") : ($("#newAndExclusive").css("min-height", "auto"), $("#stayQued").css("min-height", "auto"))
});
ACC.minicart = {
    _autoload: ["bindMiniCart", "removeFromMyBag"],
    bindMiniCart: function() {
        $(document).on("mouseenter", ".mini-cart-link", function(a) {
            a = $(this).data("miniCartUrl") + "?stamp=" + (new Date).getTime();
            $.get(a, function(a) {
                $(".mini-bag").html(a)
            })
        });
        $(document).on("click", ".js-mini-cart-close-button", function(a) {
            a.preventDefault();
            ACC.colorbox.close()
        });
        $(document).on("click", "#cboxClose, #cboxOverlay", function() {
            $(".myBag-sticky").css({
                "z-index": 1001
            })
        })
    },
    updateMiniCartDisplay: function() {
        var a = $(".js-mini-cart-link").data("miniCartRefreshUrl");
        $.get(a, function(a) {
            a = $.parseJSON(a);
            $(".js-mini-cart-link .js-mini-cart-count,span.responsive-bag-count").html(a.miniCartCount);
            $(".js-mini-cart-link .js-mini-cart-price").html(a.miniCartPrice)
        })
    },
    removeFromMyBag: function() {
        $(document).on("click", ".removeFromCart", function(a) {
            var b = $(this).attr("data-entry-no"),
                c = $(this).attr("data-ussid");
            $.ajax({
                url: ACC.config.encodedContextPath + "/cart/removeFromMinicart?entryNumber=" + b,
                type: "GET",
                cache: !1,
                success: function(b) {
                    $.ajax({
                        url: ACC.config.encodedContextPath +
                            "/cart/miniCart/TOTAL",
                        returnType: "JSON",
                        type: "GET",
                        cache: !1,
                        success: function(b) {
                            b = $.parseJSON(b);
                            quantity = parseInt(b.masterMiniCartCount);
                            $("span.js-mini-cart-count,span.js-mini-cart-count-hover,span.responsive-bag-count").text(quantity);
                            0 == quantity ? $("ul.my-bag-ul").remove() : (b = window.location.href, $(a.target).parents().find("li.item").remove(), -1 != b.indexOf("cart") && window.location.reload());
                            ACC.product.addToBagFromWl(c, !1)
                        }
                    })
                },
                error: function(a) {
                    console.log(a)
                }
            })
        })
    }
};
ACC.global = {
    _autoload: [
        ["passwordStrength", 0 < $(".password-strength").length], "bindToggleOffcanvas", "bindToggleXsSearch", "bindToggleHeaderLinks", "bindHoverIntentMainNavigation", "initImager"
    ],
    passwordStrength: function() {
        $(".password-strength").pstrength()
    },
    bindToggleOffcanvas: function() {
        $(document).on("click", ".js-toggle-sm-navigation", function() {
            ACC.global.toggleClassState($("main"), "offcanvas")
        })
    },
    bindToggleXsSearch: function() {},
    bindToggleHeaderLinks: function() {
        $(document).on("click", ".js-toggle-header-links",
            function() {
                var a = $(".md-secondary-navigation");
                $(this).blur();
                ACC.global.toggleClassState($(this), "active");
                ACC.global.toggleClassState(a, "active") ? a.slideDown(300) : a.slideUp(300)
            })
    },
    toggleClassState: function(a, b) {
        a.hasClass(b) ? a.removeClass(b) : a.addClass(b);
        return a.hasClass(b)
    },
    bindHoverIntentMainNavigation: function() {
        $("nav.main-navigation > ul > li").hoverIntent(function() {
            $(this).addClass("md-show-sub")
        }, function() {
            $(this).removeClass("md-show-sub")
        })
    },
    initImager: function() {
        new Imager(".js-responsive-image")
    },
    addGoogleMapsApi: function(a) {
        void 0 != a && 0 == $(".js-googleMapsApi").length ? $("head").append('<script class="js-googleMapsApi" type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=' + ACC.config.googleApiKey + "&sensor=false&callback=" + a + '">\x3c/script>') : void 0 != a && eval(a + "()")
    }
};
var outputdata = [];
$(function() {
    var a = $(".18-100");
    for (i = 18; 100 >= i; i++) a.append($("<option></option>").val(i).html(i))
});
$(document).ready(function() {
    switches = $("#switches > li");
    slides = $("#navigation > div.block");
    switches.each(function(a) {
        $(this).data("slide", slides.eq(a))
    }).click(function() {
        $("#navigation").show();
        $(this).siblings(".masterBrand").removeClass("active");
        $(this).siblings(".block").removeClass("active");
        $(this).addClass("active");
        $(this).next().addClass("active");
        $(this).data("slide").addClass("active")
    }).mouseleave(function() {
        $("#navigation").hide()
    });
    $("#switches,.shopbybrand #switches").mouseleave(function() {
        $("#switches > li").removeClass("active");
        $("#switches > li").next().removeClass("active")
    });
    $("#helplink,.header-helpArrow").on("click", function(a) {
        a.preventDefault();
        $(".header-helpArrow").hide();
        $(".help").addClass("header-helpBackground");
        $("#helplink").addClass("header-helpTextColor");
        $("#helpexpand").show();
        $("#close").show()
    });
    $("#close").on("click", function(a) {
        a.preventDefault();
        $(".header-helpArrow").show();
        $("#helplink").removeClass("header-helpTextColor");
        $(".help").removeClass("header-helpBackground");
        $("#helpexpand").hide();
        $("#close").hide()
    });
    $("#age").on("change", function() {
        var a = $("#age option:selected").text();
        $("#genderOrTitle").val("-Select-");
        $("#reasonOrEvent").val("-Select-");
        $("#typeOfProduct").val("");
        0 == a ? ($("#genderOrTitle option[value= MSH11]").hide(), $("#genderOrTitle option[value= MSH10]").hide(), $("#genderOrTitle option[value= MPH1112102]").show(), $("#genderOrTitle option[value= MPH1112100]").hide(), $("#genderOrTitle option[value= MPH1112101]").hide()) : 1 <= a && 12 >= a ? ($("#genderOrTitle option[value= MSH11]").hide(),
            $("#genderOrTitle option[value= MSH10]").hide(), $("#genderOrTitle option[value= MPH1112102]").hide(), $("#genderOrTitle option[value= MPH1112100]").show(), $("#genderOrTitle option[value= MPH1112101]").show()) : (12 < a ? ($("#genderOrTitle option[value= MSH11]").show(), $("#genderOrTitle option[value= MSH10]").show()) : ($("#genderOrTitle option[value= MSH11]").hide(), $("#genderOrTitle option[value= MSH10]").hide()), $("#genderOrTitle option[value= MPH1112102]").hide(), $("#genderOrTitle option[value= MPH1112100]").hide(),
            $("#genderOrTitle option[value= MPH1112101]").hide())
    });
    $("#genderOrTitle").on("change", function() {
        var a = "categoryCode=" + $("#genderOrTitle").val();
        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: ACC.config.encodedContextPath + "/search/helpmeshopforcategories",
            data: a,
            dataType: "json",
            success: function(a) {
                outputdata = [];
                for (var c = 0; c < a.length; c++) null != a[c].name && (outputdata.push(a[c].name), console.log(a[c].name));
                $("#typeOfProduct").autocomplete({
                    minLength: 0,
                    source: outputdata,
                    open: function() {
                        $(this).data("ui-autocomplete").menu.element.addClass("helpmeshop-list");
                        var a = $("input#typeOfProduct").width() + 12;
                        $(this).data("ui-autocomplete").menu.element.css("width", a + "px")
                    }
                })
            },
            error: function(a, c, d) {
                alert("error")
            }
        })
    });
    $("#closeConceirge").on("click", function() {
        $("#age").val("-Select-");
        $("#genderOrTitle").val("-Select-");
        $("#reasonOrEvent").val("-Select-");
        $("#typeOfProduct").val("")
    })
});

function navigateUrl() {
    $("#errConceirge").html("").removeClass("errorMessage");
    var a = $("#typeOfProduct").val(),
        b = $("#genderOrTitle").val(),
        c = $("#reasonOrEvent").val(),
        d = $("#age").val();
    if ("" == a || "-Select-" == b || "-Select-" == c || "-Select-" == d) return $(".select-value-concierge").hide(), $(".fill-in-concierge").show(), $("#errConceirge").html("Fill all Values").addClass("errorMessage"), !1;
    var e = !1;
    for (i in outputdata) outputdata[i].match(a) && (e = !0);
    if (e) return a = a + "," + b + "," + c + "," + d, $("#text").val(a), !0;
    $(".fill-in-concierge").hide();
    $(".select-value-concierge").show();
    $("#errConceirge").html("Please select a value from the suggested values").addClass("errorMessage");
    return !1
};
ACC.paginationsize = {
    downUpKeysPressed: !1,
    _autoload: ["bindAll"],
    bindAll: function() {
        this.bindPaginaSize()
    },
    bindPaginaSize: function() {
        with(ACC.paginationsize) bindSizeForm($("#pageSize_form1")), bindSizeForm($("#pageSize_form2"))
    },
    bindSizeForm: function(a) {
        a.change(function() {
            this.submit()
        })
    }
};
ACC.refinements = {
    _autoload: [
        ["bindMoreLessToggles", 0 != $(".js-facet-form").length],
        ["bindMoreStoresToggles", 0 != $(".js-facet-form").length],
        ["init", 0 != $(".js-facet-form").length],
        ["bindSearch", 0 != $(".js-facet-form").length]
    ],
    coords: {},
    storeSearchData: {},
    init: function() {
        navigator.geolocation.getCurrentPosition(function(a) {
            ACC.refinements.coords = a.coords
        }, function(a) {
            console.log("An error occurred... The error code and message are: " + a.code + "/" + a.message)
        })
    },
    bindSearch: function() {
        $(document).on("submit",
            "#user_location_form",
            function(a) {
                a.preventDefault();
                a = $(".js-shop-stores-facet .js-shop-store-search-input").val();
                0 < a.length && ACC.refinements.getInitStoreData(a)
            });
        $(document).on("click", "#findStoresNearMeAjax", function(a) {
            a.preventDefault();
            ACC.refinements.getInitStoreData(null, ACC.refinements.coords.latitude, ACC.refinements.coords.longitude)
        })
    },
    getInitStoreData: function(a, b, c) {
        $(".alert").remove();
        data = {
            q: "",
            page: "0"
        };
        null != a && (data.q = a);
        null != b && (data.latitude = b);
        null != c && (data.longitude = c);
        ACC.refinements.storeSearchData = data;
        ACC.refinements.getStoreData()
    },
    getStoreData: function() {
        url = $(".js-facet-form").data("url");
        $.ajax({
            url: url,
            data: ACC.refinements.storeSearchData,
            type: "get",
            success: function(a) {
                window.location.reload()
            }
        })
    },
    bindMoreLessToggles: function() {
        $(document).on("click", ".js-shop-stores-facet .js-facet-change-link", function(a) {
            a.preventDefault();
            $(".js-shop-stores-facet .js-facet-container").hide();
            $(".js-shop-stores-facet .js-facet-form").show()
        });
        $(document).on("change",
            ".js-product-facet .js-facet-checkbox",
            function() {
                $(this).parents("form").submit()
            });
        $(document).on("click", ".js-product-facet .js-more-facet-values-link", function(a) {
            a.preventDefault();
            $(this).parents(".js-facet").find(".js-facet-top-values").hide();
            $(this).parents(".js-facet").find(".js-facet-list-hidden").show();
            $(this).parents(".js-facet").find(".js-more-facet-values").hide();
            $(this).parents(".js-facet").find(".js-less-facet-values").show()
        });
        $(document).on("click", ".js-product-facet .js-less-facet-values-link",
            function(a) {
                a.preventDefault();
                $(this).parents(".js-facet").find(".js-facet-top-values").show();
                $(this).parents(".js-facet").find(".js-facet-list-hidden").hide();
                $(this).parents(".js-facet").find(".js-more-facet-values").show();
                $(this).parents(".js-facet").find(".js-less-facet-values").hide()
            })
    },
    bindMoreStoresToggles: function() {
        $(document).on("click", ".js-shop-stores-facet .js-more-stores-facet-values", function(a) {
            a.preventDefault();
            $(".js-shop-stores-facet ul.js-facet-list li.hidden").slice(0, 5).removeClass("hidden").first().find(".js-facet-checkbox").focus();
            0 == $(".js-shop-stores-facet ul.js-facet-list li.hidden").length && $(".js-shop-stores-facet .js-more-stores-facet-values").hide()
        })
    }
};
var i = 0,
    pageCount = 0,
    pagelimitAcc = 10,
    totalItem = $("#accountAddressCount").val(),
    noofpageCount = Math.ceil(totalItem / pagelimitAcc),
    start = 1,
    end = "",
    pageNo = 1;
$(document).ready(function() {
    var a = $("#pageIndex").val(),
        b = $("#pagableSize").val(),
        a = (parseInt(a) + 1) * b,
        b = a - b + 1,
        c = $("#totalNumberOfResults").val();
    a > c && (a = c);
    a = b + "-" + a + " of " + c + " Orders";
    $("#displayPaginationCountUp").html(a);
    $("#ofPagination").html(a);
    $(document).ready(function() {
        var a = $("#pageIndexC").val(),
            b = $("#pagableSizeC").val(),
            a = (parseInt(a) + 1) * b,
            b = a - b + 1,
            c = $("#totalNumberOfResultsC").val();
        a > c && (a = c);
        a = b + "-" + a + " of " + c + " Coupons";
        $("#displayPaginationCountUpCoupon").html(a)
    });
    a = "";
    for (b = 1; b <=
        noofpageCount; b++) a = a + "<a href='#nogo' onclick='pageNavigation(" + b + ")'>" + b + "</a>&emsp;";
    $("#prev").html(a);
    $(".right-account #address_item #item_ul>li").each(function(a) {
        $(this).attr("id", "p_" + a)
    });
    dispPageLimit(0, pagelimitAcc);
    for (b = 1; 2 >= b; b++) a = 1 == b ? a + "<a href='#nogo' onclick='pageNavigation(" + b + ")' class='active'>" + b + "</a>&emsp;" : a + "<a href='#nogo' onclick='pageNavigation(" + b + ")'>" + b + "</a>&emsp;";
    a += "<a href='#nogo' onclick='nextAction(0,2)' class='order-pagination-next'>Next</a>";
    $("#paginationDiv").html(a);
    $("#paginationDiv2").html(a);
    $(".right-account .order-history .pagination_ul>li").each(function(a) {
        $(this).attr("id", "p_" + a)
    });
    b = a = a = "";
    1 < totalItem ? (a = parseInt(pagelimitAcc) < parseInt(totalItem) ? pagelimitAcc : totalItem, a = "1-" + a, b = "s") : (a = 1, a = "1", b = "");
    c = "";
    c = a + " of " + totalItem + " Order" + b;
    $("#ofPaginationUp").html(c);
    dispPageLimit(0, pagelimitAcc)
});
var divItem = "";

function pageNavigation(a) {
    pageNo = a;
    $("body").on("click", ".address_pagination a", function() {
        $(".address_pagination a").removeClass("active");
        $(this).addClass("active")
    });
    a = pageNo * pagelimitAcc;
    var b = a - pagelimitAcc,
        c = a;
    pageNo == noofpageCount && (c = totalItem);
    var d = "",
        d = b + 1 + "-" + c + " of " + totalItem + " Orders";
    $("#ofPaginationUp").html(d);
    dispPageLimit(b, a)
}

function nextAction(a, b) {
    1 == pageNo && (b = 2);
    var c = b + 1;
    pageNo = b;
    c > noofpageCount && (c = b);
    if (2 <= noofpageCount) {
        divItem = "";
        divItem = "<a href='#nogo' onclick='prevAction(" + a + "," + b + ")' class='order-pagination-prev'>Prev</a>&emsp;";
        for (var d = c - 1; d <= c; d++) divItem = d == b ? divItem + "<a href='#nogo' onclick='pageNavigation(" + d + ")' class='active'>" + d + "</a>&emsp;" : divItem + "<a href='#nogo' onclick='pageNavigation(" + d + ")'>" + d + "</a>&emsp;";
        pageNo != noofpageCount && (divItem = divItem + "<a href='#nogo' onclick='nextAction(" + a +
            "," + c + ")' class='order-pagination-next'>Next</a>")
    }
    $("#paginationDiv").html(divItem);
    $("#paginationDiv2").html(divItem);
    pageNavigation(pageNo)
}

function prevAction(a, b) {
    var c = b + 1;
    c > noofpageCount && (c = b);
    var d = pageNo - 1;
    d <= pagelimitAcc && (d = 2);
    var e = pageNo - 1;
    if (2 <= noofpageCount) {
        divItem = "";
        1 != e && (divItem = "<a href='#nogo' onclick='prevAction(" + a + "," + d + ")' class='order-pagination-prev'>Prev</a>&emsp;");
        for (var k = d - 1; k <= d; k++) divItem = k == e ? divItem + "<a href='#nogo' onclick='pageNavigation(" + k + ")' class='active'>" + k + "</a>&emsp;" : divItem + "<a href='#nogo' onclick='pageNavigation(" + k + ")'>" + k + "</a>&emsp;";
        divItem = divItem + "<a href='#nogo' onclick='nextAction(" +
            a + "," + c + ")' class='order-pagination-next'>Next</a>"
    }
    $("#paginationDiv").html(divItem);
    $("#paginationDiv2").html(divItem);
    pageNavigation(e)
}

function nextAcc() {
    pageCount < noofpageCount - 1 && (pageCount++, dispPageLimit(pageCount * pagelimitAcc, (pageCount + 1) * pagelimitAcc))
}

function prevAcc() {
    0 < pageCount && (--pageCount, dispPageLimit(pageCount * pagelimitAcc, (pageCount + 1) * pagelimitAcc))
}

function dispPageLimit(a, b) {
    if (void 0 != totalItem)
        for (var c = 0; c < totalItem; c++) c >= a && c < b ? $("#p_" + c).show() : $("#p_" + c).hide()
}

function pageNavigation(a) {
    a *= pagelimitAcc;
    dispPageLimit(a - pagelimitAcc, a)
};
ACC.newWishlist = {
    _autoload: ["bindHelp", "bindManageMyList", "bindRenameWl"],
    bindHelp: function() {
        $(document).on("click", ".js-new-wishlist", function(a) {
            a.preventDefault()
        })
    },
    bindManageMyList: function() {
        $(document).on("click", ".js-manage-myList", function(a) {
            a.preventDefault();
            $(this).data("mylist")
        })
    },
    bindRenameWl: function() {
        $(document).on("click", ".js-rename-wishlist", function(a) {
            a.preventDefault()
        })
    }
};
$(document).on("click", ".delete_wishlist", function(a) {
    a.preventDefault();
    $("#delete_wishlistName").val($(this).parent().siblings(".title").find("span.wishlist-name").text());
    $(".particular-wishlist-name").html($("#delete_wishlistName").val())
});
$(document).on("click", ".deleteWlConfirmation", function(a) {
    a.preventDefault();
    deleteWishlist($("#delete_wishlistName").val())
});

function deleteWishlist(a) {
    $.ajax({
        url: ACC.config.encodedContextPath + "/my-account/deleteWishlist",
        type: "GET",
        data: {
            wishlistName: a
        },
        dataType: "json",
        cache: !1,
        contentType: "application/json; charset=utf-8",
        success: function(a) {
            window.location.href = ACC.config.encodedContextPath + "/my-account/wishList"
        },
        error: function(a) {
            alert("Some issues are there with Wishlist at this time. Please try later or contact out helpdesk")
        }
    })
}
$(document).on("click", ".rename_link", function(a) {
    a.preventDefault();
    editWishlistName = $(this).parent().find("#editWishList").val().trim();
    renameWishlist(editWishlistName)
});
$(document).on("click", ".js-rename-wishlist", function(a) {
    a.preventDefault();
    $(".rename-input").html(null)
});

function renameWishlist(a) {
    var b = $("#editWishListOld").val();
    $.ajax({
        url: ACC.config.encodedContextPath + "/my-account/editParticularWishlistName",
        type: "GET",
        data: "newWishlistName=" + a + "&wishlistOldName=" + b,
        dataType: "json",
        cache: !1,
        contentType: "application/json; charset=utf-8",
        success: function(b) {
            "success" == b ? window.location.href = ACC.config.encodedContextPath + "/my-account/viewParticularWishlist?particularWishlist=" + a : "duplicate_wishlist_name" == b ? ($(".rename-input").css("display", "block"), $(".rename-input").html("Wishlist with this name already exists")) :
                ($(".rename-input").css("display", "block"), $(".rename-input").html("Your wishlist needs a name!"))
        },
        error: function(a) {
            alert("Some issues are there with Wishlist at this time. Please try later or contact out helpdesk")
        }
    })
}
$(document).on("click", ".js-new-wishlist,.create-newlist-link", function(a) {
    a.preventDefault();
    $("#errorCreate").html(null);
    $("#newWishlistName").val("")
});
$(document).on("click", ".create_wishlist", function() {
    newWishlistData = $(this).parent().find("#newWishlistName").val().trim();
    $.ajax({
        url: ACC.config.encodedContextPath + "/my-account/createNewWishlistWP",
        type: "GET",
        data: "newWishlistData=" + newWishlistData,
        dataType: "json",
        cache: !1,
        contentType: "application/json; charset=utf-8",
        success: function(a) {
            "success" == a ? window.location.href = ACC.config.encodedContextPath + "/my-account/viewParticularWishlist?particularWishlist=" + newWishlistData : "duplicate_wishlist_name" ==
                a ? ($("#errorCreate").css("display", "block"), $("#errorCreate").html("Wishlist with this name already exists")) : ($("#errorCreate").css("display", "block"), $("#errorCreate").html("Your wishlist needs a name!"))
        },
        error: function(a) {
            alert("Some issues are there with Wishlist at this time. Please try later or contact out helpdesk")
        }
    })
});

function disp(a, b) {
    for (var c = 0; c < total; c++) c >= a && c < b ? $("#p_" + c).show() : $("#p_" + c).hide()
}
$(document).on("click", ".sizeNotSpecified_wl", function(a) {
    a.preventDefault();
    $("#redirectsToPdp_Wl").val($(this).parent().siblings(".redirectsToPdp_Wl").val())
});
$(document).on("click", ".redirectsToPdpPage", function(a) {
    a.preventDefault();
    redirectsToPDP($("#redirectsToPdp_Wl").val())
});

function redirectsToPDP(a) {
    window.location.href = ACC.config.encodedContextPath + a
}
$(document).on("click", ".remove_product_from_wl", function(a) {
    a.preventDefault();
    $("#removeFrmWl_name").val($(this).parent().siblings("#particularWishlistName_wl").val());
    $("#removeFrmWl_productcode").val($(this).parent().siblings("#productCode_wl").val());
    $("#removeFrmWl_ussid").val($(this).parent().siblings("#ussid_wl").val());
    $("#removeFrmWl_isMSDEnabled").val($(this).parent().siblings("#isMSDEnabled_wl").val());
    $("#removeFrmWl_isApparelExist").val($(this).parent().siblings("#isApparelExist_wl").val());
    $("#removeFrmWl_salesHierarchyCategoryMSD").val($(this).parent().siblings("#salesHierarchyCategoryMSD_wl").val());
    $("#removeFrmWl_productCodeForMSD").val($(this).parent().siblings("#productCodeForMSD_wl").val());
    $("#removeFrmWl_sppriceForMSD").val($(this).parent().siblings("#sppriceForMSD_wl").val());
    $("#removeFrmWl_moppriceForMSD").val($(this).parent().siblings("#moppriceForMSD_wl").val());
    $("#removeFrmWl_rootCategoryMSD").val($(this).parent().siblings("#rootCategoryMSD_wl").val())
});
$(document).on("click", ".removeProductConfirmation", function(a) {
    a.preventDefault();
    a = $("#removeFrmWl_name").val();
    var b = $("#removeFrmWl_productcode").val(),
        c = $("#removeFrmWl_ussid").val(),
        d = $("#removeFrmWl_isMSDEnabled").val(),
        e = $("#removeFrmWl_isApparelExist").val(),
        k = $("#removeFrmWl_salesHierarchyCategoryMSD").val(),
        f = $("#removeFrmWl_sppriceForMSD").val(),
        g = $("#removeFrmWl_moppriceForMSD").val(),
        h = $("#removeFrmWl_rootCategoryMSD").val();
    "undefined" === typeof d && (d = !1);
    "undefined" === typeof e && (e = !1);
    removeFromWishlist(a, b, c, d, e, h, k, "undefined" === typeof g ? f : g, "INR")
});

function removeFromWishlist(a, b, c, d, e, k, f, g, h) {
    $.ajax({
        url: ACC.config.encodedContextPath + "/my-account/wishList/remove",
        type: "GET",
        data: "wishlistName=" + a + "&productCodeWl=" + b + "&ussidWl=" + c,
        dataType: "json",
        cache: !1,
        contentType: "application/json; charset=utf-8",
        success: function(c) {
            if (Boolean(d) && Boolean(e) && "Clothing" == k) try {
                track(["removeFromWishlist", b, f, g, h])
            } catch (m) {
                console.log("Error Adding trackers when remove from cart: " + m.message)
            }
            window.location.href = ACC.config.encodedContextPath + "/my-account/viewParticularWishlist?particularWishlist=" +
                a
        },
        error: function(a) {
            alert("Some issues are there with Delete Wishlist at this time. Please try later or contact out helpdesk")
        }
    })
}
$(document).on("keypress", "#newWishlistName", function(a) {
    var b = $("#newWishlistName").val(),
        c = a.keyCode;
    if (33 <= c && 48 > c || 58 <= c && 65 > c || 91 <= c && 97 > c) a.preventDefault(), a = this.selectionStart, c = this.selectionEnd, $("#newWishlistName").val(b), $("#errorCreate").show(), $("#errorCreate").html("<font color='#ff1c47'><b>Special characters are not allowed</b></font>"), $("#errorCreate").show().fadeOut(3E3), this.setSelectionRange(a, c)
});
$(document).ready(function() {
    $("#myWishlistHeader").click(function(a) {
        a.preventDefault();
        window.location.href = $(this).attr("href")
    });
    $("#createNewList").on("show.bs.modal", function() {
        $(".product-info .product-image-container .zoom").css("z-index", "1");
        $(".zoomContainer").css("z-index", "1")
    });
    $("#createNewList").on("hidden.bs.modal", function() {
        $(this).find("input,textarea,select").val("").end();
        $(".product-info .product-image-container .zoom").css("z-index", "10000");
        $(".zoomContainer").css("z-index",
            "9999")
    })
});
$(document).on("keypress", "#editWishList", function(a) {
    var b = $("#editWishList").val(),
        c = a.keyCode;
    if (33 <= c && 48 > c || 58 <= c && 65 > c || 91 <= c && 97 > c) a.preventDefault(), a = this.selectionStart, c = this.selectionEnd, $("#editWishList").val(b), $("#errRename").show(), $("#errRename").html("<font color='#ff1c47'><b>Special characters are not allowed</b></font>"), $("#errRename").show().fadeOut(3E3), this.setSelectionRange(a, c)
});
if ("undefined" != typeof arrayrating) {
    var reviewClick = function(a) {
            CheckUserLogedIn()
        },
        reviewPopUpDisplay = function(a, b, c, d, e) {
            $(".popUpProductTitle").text(c);
            $(".popUpProductBrand").text(d);
            c = $("#new-review-link" + b).siblings().find(".picZoomer-pic").attr("src");
            if ("undefined" == typeof c || "" == c) c = $("#no-image-link" + b).find("div.image").find("img").attr("src");
            $(".review-image").attr("src", c);
            gigya.comments.showRatingUI({
                categoryID: a,
                streamID: b,
                containerID: "ratingDiv",
                linkedCommentsUI: "commentsDiv",
                showCommentButton: "true",
                onAddReviewClicked: reviewClick
            });
            gigya.comments.showCommentsUI({
                categoryID: a,
                streamID: b,
                scope: "both",
                privacy: "public",
                version: 2,
                containerID: "commentsDiv",
                cid: "",
                enabledShareProviders: "facebook,twitter",
                enabledProviders: "facebook,google,twitter"
            })
        },
        ratingReview = function(a) {
            var b = 0;
            $.each(a, function(a, d) {
                $.each(d, function(a, c) {
                    c = 5 * c / 100;
                    for (var d = Math.floor(c), g = 0; g < d; g++) $("ul.rating-stars[data-rating-name" + b + "=" + a + "] li span").eq(g).addClass("full");
                    $(".rating-stars[data-rating-name" + b + "=" + a + "] li span").eq(d).css("width",
                        100 * (c - d) + "%")
                });
                b++
            })
        },
        closeModal = function(a) {
            a = $(a).closest("li");
            $(a).unblock()
        },
        deleteReview = function() {
            var a = $("a[current-delete=true]"),
                b = $(a).attr("data-del-index"),
                a = $(".categoryID" + b).val(),
                c = $(".streamID" + b).val(),
                d = $(".commentID" + b).val();
            "" != a && "" != c && "" != d && $.ajax({
                url: "review/delete",
                type: "POST",
                dataType: "JSON",
                data: {
                    categoryID: a,
                    streamID: c,
                    commentID: d
                },
                beforeSend: function() {
                    $(".review-block" + b).unblock();
                    $(".review-block" + b).block({
                        message: "<h1 style='color:white'><span style='line-height:40px;font-size:'>Please Wait...<span></h1>"
                    })
                },
                success: function(a) {
                    "success" == a.status && ($("div[data-info-id=" + b + "]").show(), $(".review-block" + b).slideUp("slow"), setTimeout(function() {
                        location.reload()
                    }, 2E3))
                },
                fail: function() {
                    globalErrorPopup("Please try after some time.")
                },
                complete: function() {
                    $(".review-block" + b).unblock()
                }
            })
        };
    $(document).ready(function() {
        $(".edit").click(function(a) {
            a.preventDefault;
            a = $(this).attr("data-index");
            $("div[data-rating-all=" + a + "]").hide();
            if (void 0 != a) {
                var b = $(".reviewHeading" + a),
                    c = $(".reviewComment" + a),
                    d = $(".updateButtons" +
                        a),
                    e = $(".reviewComment" + a).text(),
                    k = $(".reviewHeading" + a).text();
                "" == k && (k = $("input[name=updateReviewHeading" + a + "]").val());
                $(b).html("<input class='inputBox' type='text' name='updateReviewHeading" + a + "' value='" + k + "'/>");
                $(c).html("<textarea name='updateReviewComment" + a + "' rows='5' cols='30'>" + e + "</textarea>");
                $(b).find("input.inputBox").focus();
                $(".rating-div" + a).show();
                $(".rating-div" + a).find("ul").removeClass("rate");
                $(d).show();
                $(".rating-div" + a + " .rateEdit span").removeAttr("style");
                b = arrayrating[a];
                for (key in b)
                    for (c = $(".rating-div" + a + " .rateEdit[data-rating-name" + a + "=" + key + "]"), c.data(c.attr("data-rating-name" + a), b[key] / 20), c.find("li span").removeClass("full"), d = 0; d < c.data(c.attr("data-rating-name" + a)); d++) c.find("li span").eq(d).addClass("full")
            }
        });
        $("input[name=cancel]").click(function() {
            var a = $(this).attr("data-index");
            $("div[data-rating-all=" + a + "]").show();
            var b = $(".reviewHeading" + a),
                c = $(".reviewComment" + a);
            if (void 0 != a) {
                var d = $(".hiddenReviewHeading" + a).val(),
                    e = $(".hiddenReviewComment" +
                        a).val();
                $(b).html(d);
                $(c).html(e);
                $(this).parent().hide()
            }
            $(".rating-div" + a).hide();
            ratingReview(arrayrating);
            $(".errorUpdateReview" + a).empty();
            $(".errorUpdateRating" + a).empty()
        });
        $("input[name=update]").click(function() {
            var a = !0,
                b = $(this).attr("data-index"),
                c = $("input[name=updateReviewHeading" + b + "]").val(),
                d = $("textarea[name=updateReviewComment" + b + "]").val();
            void 0 == c || "" == c.replace(/\s/g, "") ? ($(".errorUpdateReview" + b).html("<p>Please enter comments.Comment Title cannot be left blank.</p>"), a = !1) :
                250 < c.length && ($(".errorUpdateReview" + b).html("<p>Review title cannot be greater than 250 charecters.</p>"), a = !1);
            void 0 == d || "" == d.replace(/\s/g, "") ? ($(".errorUpdateReview" + b).html("<p>Please enter comments.Comment text cannot be left blank.</p>"), a = !1) : 5E3 < d.length && ($(".errorUpdateReview" + b).html("<p>Review text cannot be greater than 5000 charecters.</p>"), a = !1);
            250 < c.length && 5E3 < d.length && ($(".errorUpdateReview" + b).html("<p>Review title cannot be greater that 250 characters<br/>Review text cannot be greater than 5000 charecters.</p>"),
                a = !1);
            d = d.length;
            0 < c.length && 0 < d && a && ($(".errorUpdateReview" + b).html(""), $(".review-block" + b).block({
                message: $("#updateReviewcontainer").html()
            }))
        });
        $(document).on("click", "button.updateReviewConfirmation", function() {
            var a = !0,
                b = $(this).parents("li.review-li").attr("data-index");
            $(".errorUpdateReview" + b).empty();
            $(".errorUpdateRating" + b).empty();
            var c = $("input[name=updateReviewHeading" + b + "]").val(),
                d = $("textarea[name=updateReviewComment" + b + "]").val(),
                e = $(".categoryID" + b).val(),
                k = $(".streamID" + b).val(),
                f = $(".commentID" + b).val();
            if ("" != e && "" != k && "" != f) {
                var g = $("ul[data-rating-name" + b + "=overall] li span.full").length,
                    h = $("ul[data-rating-name" + b + "=fit] li span.full").length,
                    l = $("ul[data-rating-name" + b + "=value_for_money] li span.full").length,
                    m = $("ul[data-rating-name" + b + "=quality] li span.full").length,
                    p = $("ul[data-rating-name" + b + "=easeOfUse] li span.full").length,
                    t = null,
                    q = null;
                "Electronics" == e ? (t = "{'_overall':" + g + ", 'Quality':" + m + ",'Ease of use':" + p + ",'Value for Money':" + l + "}", q = {
                    overall: g,
                    easeOfUse: p,
                    value_for_money: l,
                    quality: m
                }) : "Clothing" == e || "Footwear" == e ? (t = "{'_overall':" + g + ", 'Quality':" + m + ",'Fit':" + h + ",'Value for Money':" + l + "}", q = {
                    overall: g,
                    fit: h,
                    value_for_money: l,
                    quality: m
                }) : t = "{'_overall':" + g + ", 'Quality':" + m + ",'Fit':" + h + ",'Value for Money':" + l + "}";
                $.ajax({
                    url: "review/edit",
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        categoryID: e,
                        streamID: k,
                        commentID: f,
                        commentText: d,
                        commentTitle: c,
                        ratings: t
                    },
                    beforeSend: function() {
                        $(".review-block" + b).block({
                            message: "<h1 style='color:white'><span style='line-height:40px;font-size:'>Please Wait...<span></h1>"
                        })
                    },
                    success: function(f) {
                        if (f)
                            if ("success" == f.status) {
                                if (void 0 != b) {
                                    f = $(".reviewHeading" + b);
                                    var h = $(".reviewComment" + b),
                                        k = $(".updateButtons" + b),
                                        l = $(".rating-div" + b);
                                    $(f).html(c);
                                    $(h).html(d);
                                    $(k).hide();
                                    $(l).hide();
                                    h = f = null;
                                    "Electronics" == e ? (f = q.easeOfUse, f = f / 5 * 100) : (h = q.fit, h = h / 5 * 100);
                                    k = q.quality;
                                    k = k / 5 * 100;
                                    l = q.value_for_money;
                                    l = l / 5 * 100;
                                    $("ul.rating-stars[data-rating-name" + b + "=_overall] li span").remove();
                                    $("ul.rating-stars[data-rating-name" + b + "=_overall] li").append("<span></span>");
                                    for (var m = 0; m < g; m++) $("ul.rating-stars[data-rating-name" +
                                        b + "=_overall] li span").eq(m).addClass("full");
                                    null == f ? $("div[data-rating" + b + "=fit]").attr("style", "width:" + h + "%") : $("div[data-rating" + b + "=easeOfUse]").attr("style", "width:" + f + "%");
                                    $("div[data-rating" + b + "=value]").attr("style", "width:" + l + "%");
                                    $("div[data-rating" + b + "=quality]").attr("style", "width:" + k + "%");
                                    $("div[data-info-id=" + b + "]").show()
                                }
                                $("div[data-rating-all=" + b + "]").show()
                            } else "failed" == f.status && ($("div[data-danger-id=" + b + "]").show(), "" != f.error && (console.log(">>> " + f.error), h = $("div[data-danger-id=" +
                                b + "]").html(), h = h + "<br><b>Description:</b>" + f.error, $("div[data-danger-id=" + b + "]").html(h), a = !1))
                    },
                    fail: function() {
                        globalErrorPopup("Please try after some time.")
                    },
                    complete: function() {
                        $(".review-block" + b).unblock();
                        a && window.location.reload()
                    }
                })
            }
        });
        $(".delete").click(function() {
            var a = $(this).attr("data-del-index");
            $(".review-block" + a).block({
                message: $("#deleteReviewcontainer").html()
            });
            $(this).attr("current-delete", "true")
        });
        $(document).on("mouseenter", ".rateEdit li", function() {
            $(this).parent().find("li span").removeAttr("style");
            $(this).parent().find("li span").removeClass("full");
            for (var a = 0; a <= $(this).index(); a++) $(this).parent().find("li span").eq(a).addClass("full")
        });
        $(document).on("mouseleave", ".rateEdit li", function() {
            $(this).parent().find("span").removeClass("full")
        });
        $(document).on("mouseleave", ".rateEdit", function() {
            for (var a = $(this).parents(".rating-wrapper").siblings(".update-wrapper").find("input[name='update']").attr("data-index"), b = 0; b < $(this).data($(this).attr("data-rating-name" + a)); b++) $(this).find("li span").eq(b).addClass("full")
        });
        $(document).on("click", ".rateEdit li", function() {
            var a = $(this).parents(".rating-wrapper").siblings(".update-wrapper").find("input[name='update']").attr("data-index");
            $(this).parent().addClass("rating-done");
            $(this).parent().data($(this).parent().attr("data-rating-name" + a), $(this).parent().find("li span.full").length)
        });
        $(".close-info,.close-danger").click(function() {
            $(this).parent().hide()
        });
        $("#reviewPluginContainer").on("hidden.bs.modal", function() {
            window.location.reload()
        });
        ratingReview(arrayrating)
    })
};
ACC.track = {
    trackAddToCart: function(a, b, c) {
        window.mediator.publish("trackAddToCart", {
            productCode: a,
            quantity: b,
            cartData: c
        })
    },
    trackRemoveFromCart: function(a, b) {
        window.mediator.publish("trackRemoveFromCart", {
            productCode: a,
            initialCartQuantity: b
        })
    },
    trackUpdateCart: function(a, b, c) {
        window.mediator.publish("trackUpdateCart", {
            productCode: a,
            initialCartQuantity: b,
            newCartQuantity: c
        })
    },
    trackAddToCartForMAD: function(a, b, c, d) {
        try {
            track(["addToCart", a, b, c, d])
        } catch (e) {
            console.log("Error Adding trackers when remove from cart: " +
                e.message)
        }
    },
    trackAddToWishListForMAD: function(a, b, c, d) {
        try {
            track(["addToWishlist", a, b, c, d])
        } catch (e) {
            console.log("Error Adding trackers when remove from cart: " + e.message)
        }
    },
    trackCarouselAddToCartForMAD: function(a, b, c, d) {
        try {
            track(["carouselAddToCart", a, b, c, d])
        } catch (e) {
            console.log("Error Adding trackers when remove from cart: " + e.message)
        }
    }
};
ACC.imagegallery = {
    _autoload: ["bindImageGallery"],
    bindImageGallery: function() {
        $(".js-gallery").each(function() {
            function a(a) {
                $(a).zoom({
                    url: $(a).find("img.lazyOwl").data("zoomImage"),
                    touch: !0,
                    on: "grab",
                    touchduration: 300,
                    onZoomIn: function() {},
                    onZoomOut: function() {
                        b.data("owlCarousel").dragging(!0);
                        b.data("zoomEnable", !0)
                    },
                    zoomEnableCallBack: function() {
                        var a = b.data("zoomEnable"),
                            c = b.data("owlCarousel");
                        0 == a ? c.dragging(!0) : c.dragging(!1);
                        return a
                    }
                })
            }
            var b = $(this).find(".js-gallery-image"),
                c = $(this).find(".js-gallery-carousel");
            b.owlCarousel({
                singleItem: !0,
                pagination: !0,
                navigation: !0,
                lazyLoad: !0,
                navigationText: ["<span class='glyphicon glyphicon-chevron-left'></span>", "<span class='glyphicon glyphicon-chevron-right'></span>"],
                afterAction: function() {
                    ACC.imagegallery.syncPosition(b, c, this.currentItem);
                    b.data("zoomEnable", !0)
                },
                startDragging: function() {
                    b.data("zoomEnable", !1)
                },
                afterLazyLoad: function(c) {
                    c = b.data("owlCarousel") || {};
                    c.currentItem || (c.currentItem = 0);
                    c = $(b.find("img.lazyOwl")[c.currentItem]);
                    a(c.parent())
                }
            });
            c.owlCarousel({
                navigation: !0,
                navigationText: ["<span class='glyphicon glyphicon-chevron-left'></span>", "<span class='glyphicon glyphicon-chevron-right'></span>"],
                pagination: !1,
                items: 2,
                itemsDesktop: [5E3, 7],
                itemsDesktopSmall: [1200, 5],
                itemsTablet: [768, 4],
                itemsMobile: [480, 3],
                lazyLoad: !0,
                afterAction: function() {}
            });
            c.on("click", "a.item", function(a) {
                a.preventDefault();
                b.trigger("owl.goTo", $(this).parent(".owl-item").data("owlItem"))
            })
        })
    },
    syncPosition: function(a, b, c) {
        b.trigger("owl.goTo", c)
    }
};
$(document).ready(function() {
    var a = !1;
    $("#socialLogin").hover(function(b) {
        0 == a && $.ajax({
            url: "/store/mpl/en/login/sociallogin",
            type: "GET",
            dataType: "text",
            success: function(a) {
                a = a.split("||");
                console.log(a[0]);
                console.log(a[1]);
                $("#fbLoginButton").attr("href", a[0]);
                $("#googleLoginButton").attr("href", a[1])
            },
            fail: function(a) {
                alert("failed")
            }
        });
        a = !0
    });
    $("#triggerLoginAjax").click(function() {
        if ("" == $("input[name=j_username]").val()) return $("#errorHolder").text("Username cannot be left empty"), !1;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("input[name=j_username]").val())) {
            if ("" ==
                $("input[name=j_password]").val()) return $("#errorHolder").text("Password cannot be left empty"), !1;
            var a = window.location.host;
            0 <= a.indexOf(":") ? document.flyOutloginForm.action = "/store/mpl/en/j_spring_security_check" : document.flyOutloginForm.action = "https://" + a + "/store/mpl/en/j_spring_security_check";
            return !0
        }
        $("#errorHolder").text("Please Enter Valid E-mail ID");
        return !1
    });
    $(document).keypress(function(a) {
        a = a.keyCode ? a.keyCode : a.which;
        0 == $(".dropdown.sign-in-dropdown.sign-in.hover").length && "13" ==
            a && $("#triggerLoginAjax").click()
    })
});
ACC.carousel = {
    _autoload: ["myFun", "shopByLookCarousel", "categoryCarousel", "myStyleCarousel", "heroProductCarousel", "springflingCarousel", "myReviewCarousel", "advancedCategoryCarousel", ["bindCarousel", 0 < $(".js-owl-carousel").length]],
    carouselConfig: {
        "default": {
            navigation: !0,
            rewindNav: !1,
            navigationText: ["<span class='glyphicon glyphicon-chevron-left'></span>", "<span class='glyphicon glyphicon-chevron-right'></span>"],
            pagination: !1,
            itemsCustom: [
                [0, 1],
                [640, 2],
                [1024, 5],
                [1400, 7]
            ]
        },
        "rotating-image": {
            navigation: !1,
            pagination: !0,
            singleItem: !0,
            rewindNav: !1
        },
        "lazy-reference": {
            navigation: !0,
            navigationText: [],
            pagination: !1,
            itemsDesktop: [5E3, 7],
            itemsDesktopSmall: [1400, 5],
            itemsTablet: [768, 3],
            itemsMobile: [480, 2],
            rewindNav: !1,
            lazyLoad: !0
        }
    },
    bindCarousel: function() {
        $(".js-owl-carousel").each(function() {
            var a = $(this);
            $.each(ACC.carousel.carouselConfig, function(b, c) {
                a.hasClass("js-owl-" + b) && $(".js-owl-" + b).owlCarousel(c)
            })
        })
    },
    categoryCarousel: function() {
        $("#mplCategoryCarousel").owlCarousel({
            navigation: !0,
            navigationText: [],
            pagination: !1,
            itemsDesktop: [5E3, 4],
            itemsDesktopSmall: [1400, 4],
            itemsTablet: [650, 2],
            itemsMobile: [480, 2],
            rewindNav: !1,
            lazyLoad: !0
        })
    },
    myFun: function() {
        $("#rotatingImage").owlCarousel({
            navigation: !0,
            rewindNav: !1,
            navigationText: [],
            pagination: !1,
            singleItem: !0
        });
        if ("undefined" !== typeof homePageBannerTimeout) {
            var a = 1E3 * parseInt(homePageBannerTimeout);
            $("#rotatingImageTimeout").owlCarousel({
                navigation: !1,
                rewindNav: !0,
                autoPlay: a,
                navigationText: [],
                pagination: !0,
                singleItem: !0,
                autoHeight: !0
            })
        }
    },
    shopByLookCarousel: function() {
        $(".shopByLookCarousel").owlCarousel({
            navigation: !0,
            rewindNav: !1,
            navigationText: [],
            pagination: !1,
            items: 2,
            itemsDesktop: !1,
            itemsDesktopSmall: !1,
            itemsTablet: !1,
            itemsMobile: !1
        })
    },
    myStyleCarousel: function() {
        $(".mystyle-carousel").owlCarousel({
            navigation: !0,
            rewindNav: !1,
            navigationText: [],
            pagination: !1,
            items: 5,
            itemsDesktop: !1,
            itemsDesktopSmall: !1,
            itemsTablet: [807, 3],
            itemsMobile: !1
        })
    },
    heroProductCarousel: function() {
        $(".product-listing.product-grid.hero_carousel").owlCarousel({
            navigation: !0,
            rewindNav: !1,
            navigationText: [],
            pagination: !1,
            itemsDesktop: [5E3, 4],
            itemsDesktopSmall: [1400, 4],
            itemsTablet: [650, 2],
            itemsMobile: [480, 2],
            lazyLoad: !0
        })
    },
    springflingCarousel: function() {
        $("div.shop-sale.wrapper #defaultNowTrending").owlCarousel({
            navigation: !0,
            rewindNav: !1,
            navigationText: [],
            pagination: !1,
            itemsDesktop: [5E3, 6],
            itemsDesktopSmall: [1400, 6],
            itemsTablet: [650, 2],
            itemsMobile: [480, 2]
        })
    },
    advancedCategoryCarousel: function() {
        $("#mplAdvancedCategoryCarousel").owlCarousel({
            navigation: !0,
            navigationText: [],
            pagination: !1,
            itemsDesktop: [5E3, 4],
            itemsDesktopSmall: [1400, 4],
            itemsTablet: [650,
                2
            ],
            itemsMobile: [480, 2],
            rewindNav: !1,
            lazyLoad: !0
        })
    },
    myReviewCarousel: function() {
        $("#my-review-carousel").owlCarousel({
            navigation: !0,
            navigationText: [],
            pagination: !1,
            itemsDesktop: [5E3, 5],
            itemsDesktopSmall: [1400, 5],
            itemsTablet: [650, 2],
            itemsMobile: [480, 2],
            rewindNav: !1,
            afterInit: function() {
                $("#my-review-carousel").show()
            }
        })
    }
};
window.matchMedia || (window.matchMedia = function() {
    var a = window.styleMedia || window.media;
    if (!a) {
        var b = document.createElement("style"),
            c = document.getElementsByTagName("script")[0],
            d = null;
        b.type = "text/css";
        b.id = "matchmediajs-test";
        c.parentNode.insertBefore(b, c);
        d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle;
        a = {
            matchMedium: function(a) {
                a = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
                b.styleSheet ? b.styleSheet.cssText = a : b.textContent = a;
                return "1px" === d.width
            }
        }
    }
    return function(b) {
        return {
            matches: a.matchMedium(b ||
                "all"),
            media: b || "all"
        }
    }
}());
$(document).ready(function() {
    $(document).on("click", "#callMe", function(a) {
        a.preventDefault();
        a = $(this).attr("href");
        $.get(a, function(a) {
            $(a).modal()
        }).success(function() {})
    });
    $(document).on("click", "#generateOTPBtn", function() {
        $(".error").each(function() {
            $(this).empty()
        });
        $.ajax({
            url: ACC.config.encodedContextPath + "/clickto/generateOTP",
            type: "GET",
            dataType: "JSON",
            data: $("#generateOTP").serialize(),
            success: function(a) {
                "true" == a.otp_generated && ($("#validateOTP").show(), $("#generateOTP").hide(), $("#emailId").val(a.emailId),
                    $("#contactNo").val(a.contactNo), $("#customerName").val(a.customerName), $("#reason").val(a.reason));
                null != a.error_name && $("label[for=errorCustomerName]").text(a.error_name);
                null != a.error_email && $("label[for=errorCustomerEmail]").text(a.error_email);
                null != a.error_contact && $("label[for=errorCustomerMobileNo]").text(a.error_contact)
            },
            fail: function(a) {
                alert("Sorry we are unable to connect to Click 2 Call service. Please try again later.")
            }
        })
    });
    $(document).on("click", "#validateOTPBtn", function() {
        $(".error").each(function() {
            $(this).empty()
        });
        $.ajax({
            url: ACC.config.encodedContextPath + "/clickto/validateOTP",
            type: "GET",
            dataType: "JSON",
            data: $("#validateOTP").serialize(),
            success: function(a) {
                if ("true" == a.valid_otp && null != a.click_to_call_response) {
                    $("#validateOTP").hide();
                    $("#generateOTP").hide();
                    var b = $.parseXML(a.click_to_call_response),
                        c = $(b).find("statusMessage"),
                        b = $(c).find("status"),
                        c = $(c).find("ewt");
                    "undefined" != $(b).text() && "" != $(b).text() && ($(".validOTP").show(), $(".validOTP p").append($(c).text() + " secs"))
                } else null != a.invalid_otp ?
                    $("label[for=errorOTP]").text(a.invalid_otp) : null != a.error_otp && $("label[for=errorOTP]").text(a.error_otp);
                a.hasOwnProperty("click_to_call_response") && 0 == a.click_to_call_response.length && ($(".mandetoryFieldMissing p").empty(), $(".mandetoryFieldMissing").show(), $(".mandetoryFieldMissing p").text("Sorry we are unable to connect to the service. Please try again later"));
                $("#validateOTPBtn").removeAttr("disabled");
                $("#validateOTPBtn").parent().find("#spinner").remove()
            },
            beforeSend: function() {
                $("#validateOTPBtn").attr("disabled",
                    "disabled");
                $("#validateOTPBtn").parent().append("<img style='position: absolute; left: 29%;' id='spinner' src='" + ACC.config.commonResourcePath + "/images/spinner.gif' />")
            },
            fail: function(a) {
                alert("Sorry we are unable to connect to Click 2 Call service. Please try again later.")
            }
        })
    });
    $(document).on("hide.bs.modal", function() {
        $("#clicktoCallModal").remove();
        $(".modal-backdrop.in").remove()
    })
});
ACC.autocomplete = {
    _autoload: ["bindSearchAutocomplete"],
    bindSearchAutocomplete: function() {
        $.widget("custom.yautocomplete", $.ui.autocomplete, {
            _create: function() {
                var a = this.element.data("options");
                this._setOptions({
                    minLength: a.minCharactersBeforeRequest,
                    displayProductImages: a.displayProductImages,
                    delay: a.waitTimeBeforeRequest,
                    autocompleteUrl: a.autocompleteUrl,
                    source: this.source
                });
                $.ui.autocomplete.prototype._create.call(this)
            },
            options: {
                cache: {},
                focus: function() {
                    return !1
                },
                select: function(a, b) {
                    window.location.href =
                        b.item.url
                }
            },
            _renderItem: function(a, b) {
                if ("autoSuggestion" == b.type) {
                    var c = "<a href='" + ACC.config.encodedContextPath + "/search/?q=" + b.value + "&best_search_keyword=" + b.searchterm + "' ><div class='name'>" + b.value + "</div></a>";
                    return $("<li>").data("item.autocomplete", b).append(c).appendTo(a)
                }
                if ("productResult" == b.type) return c = "<a href='" + ACC.config.encodedContextPath + b.url + "' >", c += "<div class='Best-Sellers'>Best Sellers</div>", null != b.image && (c += "<img src='" + b.image + "'  />"), c += "<div class='name'>" + b.value +
                    "</div>", c += "<div class='price'>" + b.price + "</div>", c += "</a>", $("<li class='product'>").data("item.autocomplete", b).append(c).appendTo(a);
                if ("brands" == b.type) return c = "<a href='" + ACC.config.contextPath + b.url + "' class='clearfix'>", c += "<span class=''>in " + b.value + "</span></a>", $("<li class='product-list'>").data("item.autocomplete", b).append(c).appendTo(a);
                if ("category" == b.type) return c = "<a href='" + ACC.config.contextPath + b.url + "' class='clearfix'>", c += "<span class=''>in " + b.value + "</span></a>", $("<li class='product-list' >").data("item.autocomplete",
                    b).append(c).appendTo(a);
                if ("productName" == b.type) return c = "<a href='" + ACC.config.contextPath + b.url + "' class=' clearfix'>", c += "<span class='title'>" + b.value + "</span></span></a>", $("<li class='product-list'>").data("item.autocomplete", b).append(c).appendTo(a);
                if ("productResult" == b.type) return c = "<a href='" + ACC.config.contextPath + b.url + "' class='product-list clearfix'>", option.displayProductImages && null != b.image && (c += "<span class='thumb'><img src='" + b.image + "' /></span><span class='desc clearfix'>"),
                    c += "<span class='title'>" + b.manufacturer + " " + b.value + "</span><span class='price'>" + b.price + "</span></span></a>", $("<li class='product-list'>").data("item.autocomplete", b).append(c).appendTo(a)
            },
            source: function(a, b) {
                var c = this,
                    d = a.term.toLowerCase(),
                    e = $("#searchCategory option:selected").val(),
                    k = d + ":" + e;
                if (k in c.options.cache) return b(c.options.cache[k]);
                k = /^([0-9]{0,15})$/;
                /^(MP|mp).([0-9]{0,15})/.test(d) || k.test(d) || $.getJSON(c.options.autocompleteUrl, {
                    term: a.term,
                    category: e
                }, function(a) {
                    var g = [];
                    null != a.suggestions && $.each(a.suggestions, function(b, c) {
                        0 == b && void 0 != a.brands.length && 0 < a.brands.length && g.push({
                            value: c.term,
                            searchterm: d,
                            url: ACC.config.encodedContextPath + "/search?text=" + c.term + "&best_search_keyword=" + d,
                            type: "autoSuggestion"
                        })
                    });
                    null != a.brands && $.each(a.brands, function(b, c) {
                        g.push({
                            value: c.name,
                            code: c.code,
                            desc: c.description,
                            url: "/mpl/en/search/?q=" + a.searchTerm + "%3Arelevance%3Abrand%3A" + c.code + "&search_category=" + e + "&best_search_keyword=" + d + "&searchCategory=" + e,
                            term: a.searchTerm,
                            type: "brands",
                            index: b,
                            valueset: !0
                        })
                    });
                    null != a.suggestions && $.each(a.suggestions, function(b, c) {
                        0 == b && void 0 != a.categories.length && 0 < a.categories.length && g.push({
                            value: c.term,
                            searchterm: d,
                            url: ACC.config.encodedContextPath + "/search?text=" + c.term,
                            type: "autoSuggestion"
                        })
                    });
                    null != a.categories && $.each(a.categories, function(b, c) {
                        g.push({
                            value: c.name,
                            code: c.code,
                            desc: c.description,
                            url: "/mpl/en/search/?q=" + a.searchTerm + "%3Arelevance%3Acategory%3A" + c.code + "&search_category=" + e + "&best_search_keyword=" + d + "&searchCategory=" +
                                e,
                            term: a.searchTerm,
                            type: "category",
                            index: b,
                            valueset: !0
                        })
                    });
                    null != a.suggestions && $.each(a.suggestions, function(b, c) {
                        0 != b && (void 0 != a.categories.length && 0 < a.categories.length || void 0 != a.brands.length && 0 < a.brands.length) && g.push({
                            value: c.term,
                            searchterm: d,
                            url: ACC.config.encodedContextPath + "/search?text=" + c.term + "&best_search_keyword=" + d,
                            type: "autoSuggestion"
                        })
                    });
                    null != a.products && $.each(a.products, function(a, b) {
                        g.push({
                            value: b.name,
                            code: b.code,
                            desc: b.description,
                            manufacturer: b.manufacturer,
                            url: b.url +
                                "/?searchCategory=" + e + "&best_product_id=" + b.code + "&search_category=" + e + "&best_search_keyword=" + d,
                            price: b.price.formattedValue,
                            type: "productResult",
                            image: null != b.images && c.options.displayProductImages ? b.images[0].url : null
                        })
                    });
                    c.options.cache[d] = g;
                    return b(g)
                })
            }
        });
        $search = $(".js-site-search-input");
        0 < $search.length && $search.yautocomplete()
    },
    bindSearchDropDown: function(a) {
        $("#searchCategory").val("category-" + a)
    },
    bindSearchText: function(a) {
        var b = a.match(/,/g);
        (null == b || 2 >= b.length) && $("#js-site-search-input").val(a)
    },
    bindMicrositeSearchDropDown: function(a) {
        $("#micrositeSearchCategory").val(a)
    }
};
ACC.pickupinstore = {
    _autoload: ["bindClickPickupInStoreButton", "bindPickupButton", "bindPickupClose", "bindPickupInStoreSearch"],
    storeId: "",
    unbindPickupPaginationResults: function() {
        $(document).off("click", "#colorbox .js-pickup-store-pager-prev");
        $(document).off("click", "#colorbox .js-pickup-store-pager-next")
    },
    bindPickupPaginationResults: function() {
        function a() {
            var a = Math.ceil(k / (5 * d) * -1) + 1;
            $("#colorbox .js-pickup-store-pager-item-from").html(5 * a - 4);
            var b = 5 * a > e ? e : 5 * a;
            1 == 5 * a - 4 ? $("#colorbox .js-pickup-store-pager-prev").hide() :
                $("#colorbox .js-pickup-store-pager-prev").show();
            5 * a > e ? $("#colorbox .js-pickup-store-pager-next").hide() : $("#colorbox .js-pickup-store-pager-next").show();
            $("#colorbox .js-pickup-store-pager-item-to").html(b)
        }
        var b = $("#colorbox .js-pickup-store-list").height(),
            c = $("#colorbox .js-pickup-store-list > li"),
            d = c.height(),
            e = c.length,
            k = 0;
        $("#colorbox .js-pickup-store-pager-item-all").html(e);
        $("#colorbox .store-navigation-pager").show();
        a();
        $(document).on("click", "#colorbox .js-pickup-store-pager-prev",
            function(d) {
                d.preventDefault();
                c.css("transform", "translateY(" + (k + b) + "px)");
                k += b;
                a("prev")
            });
        $(document).on("click", "#colorbox .js-pickup-store-pager-next", function(d) {
            d.preventDefault();
            c.css("transform", "translateY(" + (k - b) + "px)");
            k -= b;
            a("next")
        })
    },
    bindPickupInStoreQuantity: function() {
        $(".pdpPickupQtyPlus").click(function(a) {
            a.preventDefault();
            a = $(".js-add-pickup-cart #pdpPickupAddtoCartInput");
            var b = parseInt(a.val()),
                c = a.data("max");
            !isNaN(b) && b < c && (a.val(b + 1), a.change())
        });
        $(".pdpPickupQtyMinus").click(function(a) {
            a.preventDefault();
            a = $(".js-add-pickup-cart #pdpPickupAddtoCartInput");
            var b = parseInt(a.val()),
                c = a.data("min");
            !isNaN(b) && b > c && (a.val(b - 1), a.change())
        });
        $("body").on("keyup", ".js-add-pickup-cart #pdpPickupAddtoCartInput", function(a) {
            a = $(a.target);
            a.val(this.value.match(/[0-9]*/));
            a.val()
        })
    },
    bindPickupInStoreSearch: function() {
        $(document).on("click", "#pickupstore_location_search_button", function(a) {
            ACC.pickupinstore.locationSearchSubmit($("#locationForSearch").val(), $("#atCartPage").val(), $("#entryNumber").val(), $(this).parents("form").attr("action"));
            return !1
        });
        $(document).on("keypress", "#locationForSearch", function(a) {
            if (13 === a.keyCode) return a.preventDefault(), ACC.pickupinstore.locationSearchSubmit($("#locationForSearch").val(), $("#atCartPage").val(), $("input.entryNumber").val(), $(this).parents("form").attr("action")), !1
        })
    },
    bindPickupHereInStoreButtonClick: function() {
        $(document).on("click", ".pickup_add_to_bag_instore_button", function(a) {
            $(this).prev(".hiddenPickupQty").val($("#pickupQty").val())
        });
        $(document).on("click", ".pickup_here_instore_button",
            function(a) {
                $(this).prev(".hiddenPickupQty").val($("#pickupQty").val());
                ACC.colorbox.close()
            })
    },
    locationSearchSubmit: function(a, b, c, d, e, k) {
        $("#colorbox .js-add-to-cart-for-pickup-popup, #colorbox .js-qty-selector-minus, #colorbox .js-qty-selector-input, #colorbox .js-qty-selector-plus").attr("disabled", "disabled");
        $.ajax({
            url: d,
            data: {
                locationQuery: a,
                cartPage: b,
                entryNumber: c,
                latitude: e,
                longitude: k
            },
            type: "post",
            success: function(a) {
                ACC.pickupinstore.refreshPickupInStoreColumn(a)
            }
        })
    },
    createListItemHtml: function(a,
        b) {
        var c;
        c = '<li class="pickup-store-list-entry">' + ('<input type="radio" name="storeNamePost" value="' + a.displayName + '" id="pickup-entry-' + b + '" class="js-pickup-store-input" data-id="' + b + '">');
        c += '<label for="pickup-entry-' + b + '" class="js-select-store-label">';
        c += '<span class="pickup-store-info">';
        c += '<span class="pickup-store-list-entry-name">' + a.displayName + "</span>";
        c += '<span class="pickup-store-list-entry-address">' + a.line1 + " " + a.line2 + "</span>";
        c += '<span class="pickup-store-list-entry-city">' +
            a.town + "</span>";
        c += "</span>";
        c += '<span class="store-availability">';
        c += '<span class="available">' + a.formattedDistance + "<br>" + a.stockPickup + "</span>";
        c += "</span>";
        c += "</label>";
        return c += "</li>"
    },
    refreshPickupInStoreColumn: function(a) {
        a = $.parseJSON(a);
        var b = "";
        $("#colorbox .js-pickup-component").data("data", a);
        for (i = 0; i < a.data.length; i++) b += ACC.pickupinstore.createListItemHtml(a.data[i], i);
        $("#colorbox .js-pickup-store-list").html(b);
        ACC.pickupinstore.unbindPickupPaginationResults();
        ACC.pickupinstore.bindPickupPaginationResults();
        a = $("#colorbox .js-pickup-store-input")[0];
        $(a).click();
        $("#colorbox .js-add-to-cart-for-pickup-popup, #colorbox .js-qty-selector-minus, #colorbox .js-qty-selector-input, #colorbox .js-qty-selector-plus").removeAttr("disabled")
    },
    bindClickPickupInStoreButton: function() {
        $(document).on("click", ".js-pickup-in-store-button", function(a) {
            a.preventDefault();
            var b = $(this),
                c = "pickupModal_" + $(this).attr("id"),
                d = $(this).attr("id"),
                d = d.split("_"),
                d = d[1],
                e = $("#popup_store_pickup_form > #pickupModal").clone();
            a =
                $("#pickupTitle > .pickup-header").html();
            ACC.colorbox.open(a, {
                html: e,
                width: "870px",
                onComplete: function() {
                    $("#colorbox .js-add-to-cart-for-pickup-popup, #colorbox .js-qty-selector-minus, #colorbox .js-qty-selector-input, #colorbox .js-qty-selector-plus").attr("disabled", "disabled");
                    e.show();
                    ACC.pickupinstore.pickupStorePager();
                    $("#colorbox .js-pickup-tabs").accessibleTabs({
                        tabhead: ".tabhead",
                        tabbody: ".tabbody",
                        fx: "show",
                        fxspeed: 0,
                        currentClass: "active",
                        autoAnchor: !0,
                        cssClassAvailable: !0
                    });
                    $("#colorbox #pickupModal *").each(function() {
                        void 0 !=
                            $(this).attr("data-id") && ($(this).attr("id", $(this).attr("data-id")), $(this).removeAttr("data-id"))
                    });
                    $("#colorbox input#locationForSearch").focus();
                    $("#colorbox #pickupModal").attr("id", c);
                    $("#colorbox #" + c + " .thumb").html(b.data("img"));
                    $("#colorbox #" + c + " .js-pickup-product-price").html(b.data("productcart"));
                    var a = b.data("productcartVariants"),
                        f = "";
                    $.each(a, function(a, b) {
                        f += "<span>" + b + "</span>"
                    });
                    $("#colorbox #" + c + " .js-pickup-product-variants").html(f);
                    $("#colorbox  #" + c + " .js-pickup-product-info").html(b.data("productname"));
                    $("#colorbox #" + c + " form.searchPOSForm").attr("action", b.data("actionurl"));
                    $("#colorbox #" + c + " form.searchPOSForm").attr("id", "pickup_in_store_search_form_product_" + d);
                    $("#colorbox #" + c + " #pdpPickupAddtoCartInput").attr("value", void 0 !== $("#pdpPickupAddtoCartInput").val() ? $("#pdpPickupAddtoCartInput").val() : b.data("value"));
                    $("#colorbox #" + c + " input#entryNumber").attr("value", b.data("entrynumber"));
                    $("#colorbox #" + c + " input#atCartPage").attr("value", b.data("cartpage"));
                    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(a) {
                        ACC.pickupinstore.locationSearchSubmit("",
                            $("#atCartPage").val(), b.data("entrynumber"), b.data("actionurl"), a.coords.latitude, a.coords.longitude)
                    }, function(a) {
                        console.log("An error occurred... The error code and message are: " + a.code + "/" + a.message)
                    });
                    ACC.product.bindToAddToCartStorePickUpForm()
                }
            })
        })
    },
    pickupStorePager: function() {
        $(document).on("change", "#colorbox .js-pickup-store-input", function(a) {
            a.preventDefault();
            $("#colorbox .js-pickup-tabs li.first a").click();
            var b = $("#colorbox .js-pickup-component").data("data"),
                b = b.data,
                c = $(this).data("id"),
                d = $("#colorbox .display-details");
            $.each(b[c], function(a, b) {
                if ("url" == a) "" != b ? d.find(".js-store-image").html('<img src="' + b + '" alt="" />') : d.find(".js-store-image").html("");
                else if ("productcode" == a) d.find(".js-store-productcode").val(b);
                else if ("openings" == a)
                    if ("" != b) {
                        var c = d.find(".js-store-" + a),
                            g = "";
                        $.each(b, function(a, b) {
                            g += "<dt>" + a + "</dt>";
                            g += "<dd>" + b + "</dd>"
                        });
                        c.html(g)
                    } else d.find(".js-store-" + a).html("");
                else "specialOpenings" != a && ("" != b ? d.find(".js-store-" + a).html(b) : d.find(".js-store-" + a).html(""))
            });
            $(document).one("click", "#colorbox .js-pickup-map-tab", function() {
                ACC.pickupinstore.storeId = b[c];
                ACC.global.addGoogleMapsApi("ACC.pickupinstore.drawMap")
            });
            a = $("#colorbox .pickup-store-list-entry input:checked");
            $("#add_to_cart_storepickup_form .js-store-id").attr("id", a.attr("id"));
            $("#add_to_cart_storepickup_form .js-store-id").attr("name", a.attr("name"));
            $("#add_to_cart_storepickup_form .js-store-id").val(a.val());
            0 < b[c].stockLevel || "" == b[c].stockLevel ? (a = $("#add_to_cart_storepickup_form .js-qty-selector-input"),
                a.data("max", b[c].stockLevel), ACC.productDetail.checkQtySelector(a, "reset"), $("#add_to_cart_storepickup_form").show()) : $("#add_to_cart_storepickup_form").hide()
        });
        $(document).on("click", ".js-select-store-label", function(a) {
            $("#colorbox .js-pickup-component").addClass("show-store");
            $("#colorbox #cboxTitle .headline-inner").hide();
            $("#colorbox #cboxTitle .back-to-storelist").show()
        });
        $(document).on("click", ".js-back-to-storelist", function(a) {
            $("#colorbox .js-pickup-component").removeClass("show-store");
            $("#colorbox #cboxTitle .headline-inner").show();
            $("#colorbox #cboxTitle .back-to-storelist").hide()
        })
    },
    bindPickupButton: function() {
        $(document).on("click", ".js-pickup-button", function(a) {
            a.preventDefault();
            $e = $(this).parent().nextAll(".js-inline-layer");
            $e.addClass("open");
            a = $e.height();
            $e.removeClass("open");
            $e.animate({
                height: a
            })
        })
    },
    bindPickupClose: function() {
        $(document).on("click", ".js-close-inline-layer", function(a) {
            a.preventDefault();
            $e = $(this).parents(".js-inline-layer");
            $e.animate({
                height: 0
            })
        })
    },
    checkIfPointOfServiceIsEmpty: function(a) {
        return !a.find(".pointOfServiceName").text().trim().length
    },
    validatePickupinStoreCartEntires: function() {
        var a = !1;
        $("form.cartEntryShippingModeForm").each(function() {
            var b = "#" + $(this).attr("id");
            $(b + " input[value=pickUp][checked]").length && ACC.pickupinstore.checkIfPointOfServiceIsEmpty($(this)) && ($(this).addClass("shipError"), a = !0)
        });
        a && ($("div#noStoreSelected").show().focus(), $(window).scrollTop(0));
        return a
    },
    drawMap: function() {
        storeInformation = ACC.pickupinstore.storeId;
        if (0 < $("#colorbox .js-map-canvas").length) {
            $("#colorbox .js-map-canvas").attr("id", "pickup-map");
            var a = new google.maps.LatLng(storeInformation.storeLatitude, storeInformation.storeLongitude),
                a = {
                    zoom: 13,
                    zoomControl: !0,
                    panControl: !0,
                    streetViewControl: !1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: a
                },
                b = new google.maps.Map(document.getElementById("pickup-map"), a),
                c = new google.maps.Marker({
                    position: new google.maps.LatLng(storeInformation.storeLatitude, storeInformation.storeLongitude),
                    map: b,
                    title: storeInformation.name,
                    icon: "https://maps.google.com/mapfiles/markerA.png"
                }),
                d = new google.maps.InfoWindow({
                    content: storeInformation.name,
                    disableAutoPan: !0
                });
            google.maps.event.addListener(c, "click", function() {
                d.open(b, c)
            })
        }
    }
};
ACC.paginationsort = {
    downUpKeysPressed: !1,
    _autoload: ["bindAll"],
    bindAll: function() {
        this.bindPaginationSort()
    },
    bindPaginationSort: function() {
        with(ACC.paginationsort) bindSortForm($("#sortForm1")), bindSortForm($("#sortForm2"))
    },
    bindSortForm: function(a) {
        a.change(function() {
            if (!ACC.paginationsort.downUpPressed) {
                var a = this.action; - 1 != a.indexOf("helpmeshop") && (this.action = a.replace("helpmeshop", ""));
                this.submit()
            }
            ACC.paginationsort.downUpPressed = !1
        })
    },
    sortFormIEFix: function(a, b) {
        a.keydown(function(a) {
            38 ===
                a.keyCode || 40 === a.keyCode ? ACC.paginationsort.downUpPressed = !0 : 13 === a.keyCode && b !== $(this).val() ? $(this).parent().submit() : ACC.paginationsort.downUpPressed = !1
        })
    }
};
ACC.product = {
    _autoload: "addToBag enableStorePickupButton enableAddToCartButton enableVariantSelectors bindFacets resetAllPLP departmentRemoveJsHack brandFilter brandFilterCheckAll".split(" "),
    bindFacets: function() {
        $(document).on("click", ".js-show-facets", function(a) {
            a.preventDefault();
            ACC.colorbox.open("Select Refinements", {
                href: "#product-facet",
                inline: !0,
                width: "320px",
                onComplete: function() {
                    $(document).on("click", ".js-product-facet .js-facet-name", function(a) {
                        a.preventDefault();
                        $(".js-product-facet  .js-facet").removeClass("active");
                        $(this).parents(".js-facet").addClass("active");
                        $.colorbox.resize()
                    })
                },
                onClosed: function() {
                    $(document).off("click", ".js-product-facet .js-facet-name")
                }
            })
        });
        enquire.register("screen and (min-width:" + screenSmMax + ")", function() {
            $("#cboxClose").click()
        })
    },
    enableAddToCartButton: function() {
        $(".js-add-to-cart").removeAttr("disabled")
    },
    enableVariantSelectors: function() {
        $(".variant-select").removeAttr("disabled")
    },
    bindToAddToCartForm: function() {
        $(".add_to_cart_form").ajaxForm({
            success: ACC.product.displayAddToCartPopup
        })
    },
    bindToAddToCartStorePickUpForm: function() {
        $("#colorbox #add_to_cart_storepickup_form").ajaxForm({
            success: ACC.product.displayAddToCartPopup
        })
    },
    enableStorePickupButton: function() {
        $(".js-pickup-in-store-button").removeAttr("disabled")
    },
    displayAddToCartPopup: function(a, b, c, d) {
        $("#addToCartLayer").remove();
        b = $("#addToCartTitle").html();
        ACC.colorbox.open(b, {
            html: a.addToCartLayer,
            width: "320px"
        });
        $("[name=productCodePost]", d).val();
        d = $("[name=qty]", d).val();
        a = 1;
        void 0 != d && (a = d);
        d = $("span.js-mini-cart-count,span.js-mini-cart-count-hover").html();
        d = parseInt(d);
        a = parseInt(a);
        $("span.js-mini-cart-count,span.js-mini-cart-count-hover").html(d + a)
    },
    addToBag: function() {
        $(document).on("click", "#addToCartForm .js-add-to-cart", function(a) {
            ACC.product.sendAddToBag("addToCartForm");
            a.preventDefault();
            return !1
        });
        $(document).off("click", "#addToCartFormQuick").on("click", "#addToCartFormQuick", function(a) {
            $("#qty1").val($("#quantity").val());
            "no" != $("#sizeSelected").val() ? ACC.product.sendAddToBagQuick("addToCartFormQuick") : ($("#addToCartFormQuickTitle").html("<font color='#ff1c47'>" +
                $("#selectSizeId").text() + "</font>"), $("#addToCartFormQuickTitle").show().fadeOut(6E3));
            a.preventDefault();
            return !1
        });
        $(document).on("click", "#addToCartSizeGuide .js-add-to-cart", function(a) {
            $("#sizeSelectedVal").val();
            $("#sizeQty").val($("#sizeGuideQty").val());
            "#" != $("#variant.size-g option:selected").val() ? ACC.product.sendAddToBagSizeGuide("addToCartSizeGuide") : ($("#sizeSelectedSizeGuide").html("<font color='#ff1c47'>" + $("#sizeSelectedSizeGuide").text() + "</font>"), $("#sizeSelectedSizeGuide").show());
            a.preventDefault();
            return !1
        });
        $(document).on("click", "#addToCartFormId .js-add-to-cart", function(a) {
            ACC.product.sendAddToBag("addToCartFormId");
            a.preventDefault();
            return !1
        });
        $(document).on("click", ".serp_add_to_cart_form .js-add-to-cart", function(a) {
            ACC.product.sendAddToBag($(this).closest("form").attr("id"));
            a.preventDefault();
            return !1
        });
        $(document).on("click", ".js-add-to-cart_wl", function(a) {
            a.preventDefault();
            a = $(this).closest(".add_to_cart_wl_form");
            $("#AddToBagFrmWl_isMSDEnabled").val($(this).parent().siblings("#isMSDEnabled_wl_AddToBag").val());
            $("#AddToBagFrmWl_isApparelExist").val($(this).parent().siblings("#isApparelExist_wl_AddToBag").val());
            $("#AddToBagFrmWl_salesHierarchyCategoryMSD").val($(this).parent().siblings("#salesHierarchyCategoryMSD_wl_AddToBag").val());
            $("#AddToBagFrmWl_productCodeForMSD").val($(this).parent().siblings("#productCodeForMSD_wl_AddToBag").val());
            $("#AddToBagFrmWl_sppriceForMSD").val($(this).parent().siblings("#sppriceForMSD_wl_AddToBag").val());
            $("#AddToBagFrmWl_moppriceForMSD").val($(this).parent().siblings("#moppriceForMSD_wl_AddToBag").val());
            $("#AddToBagFrmWl_rootCategoryMSD").val($(this).parent().siblings("#rootCategoryMSD_wl_AddToBag").val());
            ACC.product.sendAddToBagWl(a.attr("id"));
            return !1
        });
        $("#ajax-loader").hide();
        $("#popUpModal").on("shown.bs.modal", function() {
            $(".sizes").focus()
        })
    },
    sendAddToBagWl: function(a) {
        var b = $("#" + a).serialize();
        $.ajax({
            url: ACC.config.encodedContextPath + "/cart/add",
            data: b,
            type: "POST",
            cache: !1,
            beforeSend: function() {
                $("#ajax-loader").show()
            },
            success: function(b) {
                if (0 <= b.indexOf("cnt:")) {
                    $("#" + a + "Title").html("");
                    $("#" + a + "Title").html("<font color='#00CBE9'>" + $("#addtobagwl").text() + "</font>");
                    $("#" + a + "Title").show().fadeOut(6E3);
                    var d = [],
                        d = a.split("_");
                    ACC.product.addToBagFromWl(d[2], !0);
                    $("span.js-mini-cart-count,span.js-mini-cart-count-hover,span.responsive-bag-count").text(b.substring(4));
                    b = $("#AddToBagFrmWl_isMSDEnabled").val();
                    var d = $("#AddToBagFrmWl_isApparelExist").val(),
                        e = $("#AddToBagFrmWl_salesHierarchyCategoryMSD").val(),
                        k = $("#AddToBagFrmWl_sppriceForMSD").val(),
                        f = $("#AddToBagFrmWl_moppriceForMSD").val(),
                        g = $("#AddToBagFrmWl_rootCategoryMSD").val(),
                        h = $("#AddToBagFrmWl_productCodeForMSD").val();
                    "undefined" === typeof b && (b = !1);
                    "undefined" === typeof d && (d = !1);
                    Boolean(b) && Boolean(d) && "Clothing" === g && ACC.track.trackAddToCartForMAD(h, e, "undefined" === typeof f ? k : f, "INR")
                } else {
                    if ("reachedMaxLimit" == b) $("#" + a + "Title").html(""), $("#" + a + "Title").html("<br/><font color='#ff1c47'>" + $("#bagtofullwl").html() + "</font>");
                    else if ("crossedMaxLimit" == b) $("#" + a + "Title").html(""), $("#" + a + "Title").html("<font color='#ff1c47'>" +
                        $("#bagfullwl").text() + "</font>");
                    else {
                        if ("outofinventory" == b) return $("#" + a + "noInventory").html("<font color='#ff1c47'>" + $("#addToCartFormnoInventory").text() + "</font>"), $("#" + a + "noInventory").show().fadeOut(6E3), !1;
                        if ("willexceedeinventory" == b) return $("#" + a + "excedeInventory").html("<font color='#ff1c47'>" + $("#addToCartFormexcedeInventory").text() + "</font>"), $("#" + a + "excedeInventory").show().fadeOut(6E3), !1;
                        $("#" + a + "Title").html("");
                        $("#" + a + "Title").html("<br/><font color='#ff1c47'>" + $("#addtobagerrorwl").text() +
                            "</font>")
                    }
                    $("#" + a + "Title").show()
                }
            },
            complete: function() {
                $("#ajax-loader").hide()
            },
            error: function(a) {}
        })
    },
    addToBagFromWl: function(a, b) {
        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: ACC.config.encodedContextPath + "/my-account/addToBagFromWl",
            data: {
                ussid: a,
                addedToCart: b
            },
            dataType: "json",
            success: function(a) {
                alert("success_yipee")
            }
        })
    },
    sendAddToBag: function(a) {
        var b = $("#" + a).serialize();
        $("#" + a + " :input[name='qty']").val();
        $("#" + a + " :input[name='stock']").val();
        $("#" + a + " :input[name='qty']").val();
        $("#" + a + " :input[name='stock']").val();
        if ("#" == $("#variant,#sizevariant option:selected").val()) return $("#" + a + "Title").html("<font color='#ff1c47'>" + $("#selectSizeId").text() + "</font>"), $("#" + a + "Title").show(), !1;
        $.ajax({
            url: ACC.config.encodedContextPath + "/cart/add",
            data: b,
            type: "POST",
            cache: !1,
            beforeSend: function() {
                $("#ajax-loader").show()
            },
            success: function(b) {
                if (0 <= b.indexOf("cnt:")) $("#" + a + "TitleSuccess").html(""), $("#" + a + "TitleSuccess").html("<font color='#00CBE9'>" + $("#addtobag").text() + "</font>"),
                    $("#" + a + "TitleSuccess").show().fadeOut(5E3), $("#" + a + "Title.sellerAddToBagTitle").show().fadeOut(5E3), $("#" + a + " .addToCartSerpTitle").show().fadeOut(5E3), $("span.js-mini-cart-count,span.js-mini-cart-count-hover,span.responsive-bag-count").text(b.substring(4));
                else {
                    if ("reachedMaxLimit" == b) $("#" + a + "Title").html(""), $("#" + a + "Title").html("<br/><font color='#ff1c47'>" + $("#bagtofull").html() + "</font>");
                    else if ("crossedMaxLimit" == b) $("#" + a + "Title").html(""), $("#" + a + "Title").html("<font color='#ff1c47'>" +
                        $("#bagfull").text() + "</font>");
                    else {
                        if ("outofinventory" == b) return $("#" + a + "noInventory").html("<font color='#ff1c47'>" + $("#addToCartFormnoInventory").text() + "</font>"), $("#" + a + "noInventory").show().fadeOut(6E3), !1;
                        if ("willexceedeinventory" == b) return $("#" + a + "excedeInventory").html("<font color='#ff1c47'>" + $("#addToCartFormexcedeInventory").text() + "</font>"), $("#" + a + "excedeInventory").show().fadeOut(6E3), !1;
                        $("#" + a + "Title").html("");
                        $("#" + a + "Title").html("<br/><font color='#ff1c47'>" + $("#addtobagerror").text() +
                            "</font>")
                    }
                    $("#" + a + "Title").show().fadeOut(5E3)
                }
                b = $("input[name=isMSDEnabled]").val();
                if ("true" === b) {
                    var d = $("input[name=isApparelExist]").val(),
                        e = $("input[name=salesHierarchyCategoryMSD]").val(),
                        k = $("input[name=rootCategoryMSD]").val(),
                        f = $("input[name=productCodeMSD]").val(),
                        g = $("input[id=price-for-mad]").val();
                    "undefined" === typeof b && (b = !1);
                    "undefined" === typeof d && (d = !1);
                    Boolean(b) && Boolean(d) && "Clothing" === k && ACC.track.trackAddToCartForMAD(f, e, g, "INR")
                }
            },
            complete: function() {
                $("#ajax-loader").hide()
            },
            error: function(a) {}
        })
    },
    sendAddToBagQuick: function(a) {
        var b = $("#" + a).serialize();
        $("#" + a + " :input[name='qty']").val();
        $("#" + a + " :input[name='stock']").val();
        $("#" + a + " :input[name='qty']").val();
        $("#" + a + " :input[name='stock']").val();
        $.ajax({
            url: ACC.config.encodedContextPath + "/cart/add",
            data: b,
            type: "POST",
            cache: !1,
            beforeSend: function() {
                $("#ajax-loader").show()
            },
            success: function(b) {
                if (0 <= b.indexOf("cnt:")) $("#" + a + "TitleSuccess").html(""), $("#" + a + "TitleSuccess").html("<font color='#00CBE9'>" + $("#addtobag").text() +
                    "</font>"), $("#" + a + "TitleSuccess").show().fadeOut(5E3), $("#" + a + "Title.sellerAddToBagTitle").show().fadeOut(5E3), $("#" + a + " .addToCartSerpTitle").show().fadeOut(5E3), $("span.js-mini-cart-count,span.js-mini-cart-count-hover,span.responsive-bag-count").text(b.substring(4));
                else {
                    if ("reachedMaxLimit" == b) $("#" + a + "Title").html(""), $("#" + a + "Title").html("<br/><font color='#ff1c47'>" + $("#bagtofull").html() + "</font>");
                    else if ("crossedMaxLimit" == b) $("#" + a + "Title").html(""), $("#" + a + "Title").html("<font color='#ff1c47'>" +
                        $("#bagfull").text() + "</font>");
                    else {
                        if ("outofinventory" == b) return $("#" + a + "noInventory").html("<font color='#ff1c47'>" + $("#addToCartFormnoInventory").text() + "</font>"), $("#" + a + "noInventory").show().fadeOut(6E3), !1;
                        if ("willexceedeinventory" == b) return $("#" + a + "excedeInventory").html("<font color='#ff1c47'>" + $("#addToCartFormexcedeInventory").text() + "</font>"), $("#" + a + "excedeInventory").show().fadeOut(6E3), !1;
                        $("#" + a + "Title").html("");
                        $("#" + a + "Title").html("<br/><font color='#ff1c47'>" + $("#addtobagerror").text() +
                            "</font>")
                    }
                    $("#" + a + "Title").show().fadeOut(5E3)
                }
                b = $("input[name=isMSDEnabled]").val();
                if ("true" === b) {
                    var d = $("input[name=isApparelExist]").val(),
                        e = $("input[name=salesHierarchyCategoryMSD]").val(),
                        k = $("input[name=rootCategoryMSD]").val(),
                        f = $("input[name=productCodeMSD]").val(),
                        g = $("input[id=price-for-mad]").val();
                    "undefined" === typeof b && (b = !1);
                    "undefined" === typeof d && (d = !1);
                    Boolean(b) && Boolean(d) && "Clothing" === k && ACC.track.trackAddToCartForMAD(f, e, g, "INR")
                }
            },
            complete: function() {
                $("#ajax-loader").hide()
            },
            error: function(a) {}
        })
    },
    sendAddToBagSizeGuide: function(a) {
        var b = $("#" + a).serialize();
        $("#" + a + " :input[name='qty']").val();
        $("#" + a + " :input[name='stock']").val();
        $("#" + a + " :input[name='qty']").val();
        $("#" + a + " :input[name='stock']").val();
        $.ajax({
            url: ACC.config.encodedContextPath + "/cart/add",
            data: b,
            type: "POST",
            cache: !1,
            beforeSend: function() {
                $("#ajax-loader").show()
            },
            success: function(b) {
                if (0 <= b.indexOf("cnt:")) $("#" + a + "TitleSuccess").html(""), $("#" + a + "TitleSuccess").html("<font color='#00CBE9'>" + $("#addtobag").text() +
                    "</font>"), $("#" + a + "TitleSuccess").show().fadeOut(5E3), $("#" + a + "Title.sellerAddToBagTitle").show().fadeOut(5E3), $("#" + a + " .addToCartSerpTitle").show().fadeOut(5E3), $("span.js-mini-cart-count,span.js-mini-cart-count-hover,span.responsive-bag-count").text(b.substring(4));
                else if ("reachedMaxLimit" == b) $("#" + a + "Titlebagtofull").html("<br/><font color='#ff1c47'>" + $("#addToCartSizeGuideTitlebagtofull").html() + "</font>"), $("#" + a + "Titlebagtofull").show().fadeOut(5E3);
                else if ("crossedMaxLimit" == b) $("#" + a + "Titlebagfull").html("<font color='#ff1c47'>" +
                    $("#addToCartSizeGuideTitlebagfull").text() + "</font>"), $("#" + a + "Titlebagfull").show().fadeOut(5E3);
                else {
                    if ("outofinventory" == b) return $("#" + a + "noInventorySize").html("<font color='#ff1c47'>" + $("#addToCartSizeGuidenoInventorySize").text() + "</font>"), $("#" + a + "noInventorySize").show().fadeOut(6E3), !1;
                    if ("willexceedeinventory" == b) return $("#" + a + "excedeInventorySize").html("<font color='#ff1c47'>" + $("#addToCartSizeGuideexcedeInventorySize").text() + "</font>"), $("#" + a + "excedeInventorySize").show().fadeOut(6E3), !1;
                    $("#" + a + "Titleaddtobagerror").html("");
                    $("#" + a + "Titleaddtobagerror").html("<br/><font color='#ff1c47'>" + $("#addToCartSizeGuideTitleaddtobagerror").text() + "</font>");
                    $("#" + a + "Titleaddtobagerror").show().fadeOut(5E3)
                }
                b = $("input[name=isMSDEnabled]").val();
                if ("true" === b) {
                    var d = $("input[name=isApparelExist]").val(),
                        e = $("input[name=salesHierarchyCategoryMSD]").val(),
                        k = $("input[name=rootCategoryMSD]").val(),
                        f = $("input[name=productCodeMSD]").val(),
                        g = $("input[id=price-for-mad]").val();
                    "undefined" === typeof b &&
                        (b = !1);
                    "undefined" === typeof d && (d = !1);
                    Boolean(b) && Boolean(d) && "Clothing" === k && ACC.track.trackAddToCartForMAD(f, e, g, "INR")
                }
            },
            complete: function() {
                $("#ajax-loader").hide()
            },
            error: function(a) {}
        })
    },
    displayAddToCart: function(a, b, c) {
        a = $("#" + b);
        $("[name=productCodePost]", a).val();
        var d = 0;
        $.ajax({
            url: ACC.config.encodedContextPath + "/cart/miniCart/TOTAL",
            returnType: "JSON",
            type: "GET",
            cache: !1,
            success: function(a) {
                a = $.parseJSON(a);
                d = parseInt(a.masterMiniCartCount);
                $("span.js-mini-cart-count,span.js-mini-cart-count-hover,span.responsive-bag-count").text(d)
            }
        })
    },
    resetAllPLP: function() {
        if ("undefined" !== typeof utag_data) {
            var a = utag_data.page_type;
            "product" === a && (a = window.location.href, a = a.split("?"), a instanceof Array && (a = a[0]), $("a.reset").attr("href", a))
        }
        "undefined" !== typeof utag_data && (a = utag_data.page_type, "generic" === a && (a = window.location.href, a = a.split("?"), a instanceof Array && (a = a[0]), $("a.reset").attr("href", a), a = window.location.href, -1 < a.indexOf("/o") && (a = a.split("&"), a instanceof Array && (a = a[0]), $("a.reset").attr("href", a))))
    },
    departmentRemoveJsHack: function() {},
    brandFilter: function() {
        $('input[class="brandSearchTxt"]').keyup(function() {
            var a = this,
                b = $("ul > li.filter-brand").find("span.facet-label"),
                c = b.filter(function(b, c) {
                    var k = $(c).text().toUpperCase(),
                        f = a.value.toUpperCase();
                    return ~k.indexOf(f)
                });
            0 < c.size() && ($(this).parents(".js-facet").find(".js-facet-top-values").hide(), $(this).parents(".js-facet").find(".js-facet-list-hidden").show(), $(this).parents(".js-facet").find(".js-more-facet-values").hide(), $(this).parents(".js-facet").find(".js-less-facet-values").show());
            "" == a.value.toUpperCase() && ($(this).parents(".js-facet").find(".js-facet-top-values").show(), $(this).parents(".js-facet").find(".js-facet-list-hidden").hide(), $(this).parents(".js-facet").find(".js-more-facet-values").show(), $(this).parents(".js-facet").find(".js-less-facet-values").hide());
            b.hide();
            $(".brand .js-facet-top-values").hide();
            $(".brand .js-facet-list.js-facet-list-hidden").show();
            c.show();
            "" == $('input[class="brandSearchTxt"]').val() && ($(".brand .js-facet-top-values").show(), $(".brand .js-facet-list.js-facet-list-hidden").hide())
        })
    },
    brandFilterCheckAll: function() {
        $allListElements = $("ul > li.filter-brand").find("span.facet-label");
        var a = "",
            b = 0,
            c = "",
            d = "all";
        $(document).on("click", ".brandSelectAll", function() {
            var e = $(this).text(),
                k = null;
            "Check All" == e ? k = !0 : "Uncheck All" == e && (k = !1);
            $(".filter-brand").each(function() {
                a = $(this).find("input[name=q]").val();
                if (k) {
                    var e = a.split(":"),
                        g = "";
                    if (0 == b) {
                        if (c += a, -1 != a.indexOf(":category:"))
                            for (g = a.split(":"), e = 2; e < g.length; e += 2) - 1 != g[e].indexOf("category") && (d = g[e + 1])
                    } else -1 == c.indexOf(e[e.length -
                        1]) && (g = e[e.length - 2] + ":" + e[e.length - 1], c = c + ":" + g);
                    b += 1;
                    window.location.href = "?q=" + c + "&searchCategory=" + d + "&selectAllBrand=true"
                } else {
                    for (var g = "", h = $(this).find("input[name=q]").val().split(":"), g = g + h[0] + ":" + h[1], e = 2; e < h.length; e += 2) - 1 == h[e].indexOf("brand") && (g = g + ":" + h[e] + ":" + h[e + 1]), -1 != h[e].indexOf("category") && (d = h[e + 1]);
                    window.location.href = "?q=" + g + "&searchCategory=" + d + "&selectAllBrand=false"
                }
            })
        })
    }
};
ACC.nowtrending = {
    _autoload: ["bindNowTrendingCategory"],
    bindNowTrendingCategory: function() {
        var a = function() {
            var a = $(".owl-wrapper-outer").width(),
                c = 0,
                c = 768 < $(window).width() ? a / 5 : 768 >= $(window).width() && 480 < $(window).width() ? a / 3 : a / 2;
            $(".owl-item").css("width", c)
        };
        $("#categories").change(function() {
            var b = $("#categories").val();
            $.ajax({
                type: "GET",
                dataType: "json",
                url: ACC.config.encodedContextPath + "/view/MplNowTrendingProductCarouselComponentController/nowtrending?categoryCode=" + b,
                success: function(b) {
                    $("#defaultNowTrending .owl-wrapper").empty();
                    $.each(b, function(a, b) {
                        var c = "<div class='owl-item' ><div class='item slide'><a class='product-tile' href='" + ACC.config.encodedContextPath + b.productUrl + "'><div class='image'><img src='" + b.productImageUrl + "'/></div><div class='short-info'><h3 class='product-name'>" + b.productName + "</h3><div class='price'>" + b.productPrice + "</div></div></a><a href='" + ACC.config.encodedContextPath + b.productUrl + "/quickView' class='js-reference-item'>QuickView</a></div></div>";
                        $("#defaultNowTrending .owl-wrapper").append(c)
                    });
                    ACC.quickview.bindToUiCarouselLink();
                    a()
                },
                error: function() {
                    alert("Error occured")
                }
            })
        })
    }
};
ACC.brandcomponent = {
    _autoload: ["bindBrandComponent", "showOrHideBrands"],
    bindBrandComponent: function() {
        $(window).on("load resize", function() {
            767 < $(window).width() && (switches = $("#switches .masterBrand"), switches.each(function(a) {
                    switches.eq(a).hover(function() {
                        switches.removeClass("active");
                        $("#navigation .block").eq(a).addClass("active");
                        var b = $(".range.current").attr("id");
                        $("[data-tab=" + b + "]").css({
                            "border-bottom": "3px solid",
                            "font-weight": "bold"
                        })
                    }, function() {
                        $("#navigation .block").removeClass("active")
                    })
                }),
                $(".block").hover(function(a) {
                    $(a.target);
                    $(this).addClass("active")
                }, function() {
                    $(this).removeClass("active");
                    $(".range").hide();
                    $(".range.current").show();
                    $(".brandGroupLink").css({
                        "border-bottom": "none",
                        "font-weight": "400"
                    })
                }))
        })
    },
    showOrHideBrands: function() {
        $("#atozbrandsdiplay").on("mouseover touchend", ".brandGroupLink", function() {
            $(".range").hide();
            var a = $(this).attr("data-tab");
            $("#" + a).show();
            $("[data-tab=" + a + "]").is(":visible") && ($(".brandGroupLink").css({
                    "border-bottom": "none",
                    "font-weight": "400"
                }),
                $("[data-tab=" + a + "]").css({
                    "border-bottom": "3px solid",
                    "font-weight": "bold"
                }))
        })
    }
};
ACC.cartitem = {
    _autoload: ["bindCartItem"],
    bindCartItem: function() {
        $(".remove-entry-button").on("click", function() {
            var a = $(this).closest("li.item").prev();
            console.log(a);
            var b, c, d, e, k;
            a.find("input").each(function(a) {
                "0" == a ? c = $(this).attr("value") : "1" == a ? e = $(this).attr("value") : "2" == a ? b = $(this).attr("value") : "3" == a ? d = $(this).attr("value") : "4" == a && (k = $(this).attr("value"))
            });
            console.log(c);
            console.log(e);
            console.log(b);
            console.log(d);
            console.log(k);
            var f = $("input[name=isMSDEnabled]").val();
            console.log(f);
            var g = $("input[name=isApparelExist]").val();
            console.log(g);
            "undefined" === typeof f && (f = !1);
            "undefined" === typeof g && (g = !1);
            var a = $(this).attr("id").split("_"),
                h = a[1];
            $("#updateCartForm" + h[1]);
            var l = a[2];
            $.ajax({
                url: ACC.config.encodedContextPath + "/cart/removeFromMinicart?entryNumber=" + h,
                type: "GET",
                cache: !1,
                success: function(a) {
                    ACC.product.addToBagFromWl(l, !1);
                    Boolean(f) && Boolean(g) && "Clothing" == e && trackMAD(b, c, k, "INR");
                    window.location.reload()
                },
                error: function(a) {
                    console.log(a)
                }
            })
        })
    }
};
var trackMAD = function(a, b, c, d) {
    var e = $("input[name=currentPageMSD]").val();
    console.log(e);
    if ("CART" == e) try {
        track(["removeFromCart", a, b, c, d])
    } catch (k) {
        console.log("Error Adding trackers when remove from cart: " + k.message)
    }
};
ACC.productDetail = {
    _autoload: ["initPageEvents", "bindVariantOptions"],
    checkQtySelector: function(a, b) {
        var c = $(a).parents(".js-qty-selector").find(".js-qty-selector-input"),
            d = parseInt(c.val()),
            c = c.data("max"),
            e = $(a).parents(".js-qty-selector").find(".js-qty-selector-minus"),
            k = $(a).parents(".js-qty-selector").find(".js-qty-selector-plus");
        $(a).parents(".js-qty-selector").find(".btn").removeAttr("disabled");
        "minus" == b ? 1 != d ? (ACC.productDetail.updateQtyValue(a, d - 1), 1 == d - 1 && e.attr("disabled", "disabled")) :
            e.attr("disabled", "disabled") : "reset" == b ? ACC.productDetail.updateQtyValue(a, 1) : "plus" == b ? d != c ? (ACC.productDetail.updateQtyValue(a, d + 1), d + 1 == c && k.attr("disabled", "disabled")) : k.attr("disabled", "disabled") : "input" == b && (1 == d ? $(a).parents(".js-qty-selector").find(".js-qty-selector-minus").attr("disabled", "disabled") : d == c ? $(a).parents(".js-qty-selector").find(".js-qty-selector-plus").attr("disabled", "disabled") : 1 > d ? (ACC.productDetail.updateQtyValue(a, 1), $(a).parents(".js-qty-selector").find(".js-qty-selector-minus").attr("disabled",
                "disabled")) : d > c && (ACC.productDetail.updateQtyValue(a, c), $(a).parents(".js-qty-selector").find(".js-qty-selector-plus").attr("disabled", "disabled")))
    },
    updateQtyValue: function(a, b) {
        var c = $(a).parents(".js-qty-selector").find(".js-qty-selector-input"),
            d = $(a).parents(".addtocart-component").find("#addToCartForm").find(".js-qty-selector-input");
        c.val(b);
        d.val(b)
    },
    initPageEvents: function() {
        $(document).on("click", ".js-qty-selector .js-qty-selector-minus", function() {
            ACC.productDetail.checkQtySelector(this,
                "minus")
        });
        $(document).on("click", ".js-qty-selector .js-qty-selector-plus", function() {
            ACC.productDetail.checkQtySelector(this, "plus")
        });
        $(document).on("keydown", ".js-qty-selector .js-qty-selector-input", function(a) {
            " " != $(this).val() && (48 <= a.which && 57 >= a.which || 96 <= a.which && 105 >= a.which) || 8 == a.which || 46 == a.which || 37 == a.which || 39 == a.which || 9 == a.which || (38 == a.which ? ACC.productDetail.checkQtySelector(this, "plus") : 40 == a.which ? ACC.productDetail.checkQtySelector(this, "minus") : a.preventDefault())
        });
        $(document).on("keyup",
            ".js-qty-selector .js-qty-selector-input",
            function(a) {
                ACC.productDetail.checkQtySelector(this, "input");
                ACC.productDetail.updateQtyValue(this, $(this).val())
            });
        $("#Size").change(function() {
            var a = "",
                b = 0;
            $("#Size option:selected").each(function() {
                a = $(this).attr("value");
                b = $(this).attr("index")
            });
            0 != b && (window.location.href = a)
        });
        $("#variant").change(function() {
            var a = "",
                b = 0;
            $("#variant option:selected").each(function() {
                a = $(this).attr("value");
                b = $(this).attr("index")
            });
            0 != b && (window.location.href = a)
        });
        $(document).on("click",
            "a[data-target=#popUpModal] ",
            function() {
                var a = $(this).attr("href");
                console.log(a);
                var b = $(this).attr("data-productcode");
                console.log(b);
                $("body").on("hidden.bs.modal", "#popUpModal", function() {
                    $(this).removeData("bs.modal")
                });
                $("#popUpModal .modal-content").load(a, function() {
                    $("#popUpModal").modal("show");
                    buyboxDetailsForSizeGuide(b)
                })
            });
        $(document).on("change", ".variant-select", function() {
            console.log($(this).find("option:selected").data("productcode1"));
            var a = $(this).find("option:selected").data("producturl");
            console.log(a);
            var b = $(this).find("option:selected").data("productcode1");
            console.log(b);
            $("#popUpModal .modal-content").load(a, function() {
                $("#popUpModal").modal("show");
                buyboxDetailsForSizeGuide(b)
            })
        })
    },
    bindVariantOptions: function() {
        ACC.productDetail.bindCurrentStyle();
        ACC.productDetail.bindCurrentSize();
        ACC.productDetail.bindCurrentType()
    },
    bindCurrentStyle: function() {
        var a = $("#currentStyleValue").data("styleValue"),
            b = $(".styleName");
        null != a && b.text(": " + a)
    },
    bindCurrentSize: function() {
        var a = $("#currentSizeValue").data("sizeValue"),
            b = $(".sizeName");
        null != a && b.text(": " + a)
    },
    bindCurrentType: function() {
        var a = $("#currentTypeValue").data("typeValue"),
            b = $(".typeName");
        null != a && b.text(": " + a)
    }
};
var ussidValue = "";
$(document).on("click", "#colorbox .productImageGallery .imageList img", function(a) {
    $("#colorbox .main-image img.picZoomer-pic").attr("src", $(this).attr("data-primaryimagesrc"));
    $("#colorbox .productImageGallery .thumb").removeClass("active");
    $(this).parent(".thumb").addClass("active");
    $(".zoomContainer").remove();
    $(".picZoomer-pic").removeData("zoom-image");
    $("img.picZoomer-pic").attr("data-zoom-image", $(".quickview .product-image-container .productImageGallery .active img").attr("data-zoomimagesrc"));
    $(".quickview .picZoomer-pic").elevateZoom({
        zoomType: "window",
        cursor: "crosshair",
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 750
    })
});
$(".product-image-container .productImageGallery.pdp-gallery .imageList img").click(function(a) {
    "image" == $(this).attr("data-type") ? ($("#videoFrame").hide(), $(".productImagePrimary .picZoomer-pic-wp img").show(), $(".productImagePrimary .picZoomer-pic-wp img").attr("src", $(this).attr("data-primaryimagesrc")), $("#videoFrame").attr("src", ""), $(".super_zoom img").attr("src", $(this).attr("data-zoomimagesrc")), $(".productImageGallery .thumb").removeClass("active"), $(this).parent(".thumb").addClass("active"),
        $(".zoomContainer").remove(), $(".picZoomer-pic").removeData("zoom-image"), $(".picZoomer-pic-wp img").attr("data-zoom-image", $(this).attr("data-zoomimagesrc")), 789 < $(window).width() && $(".picZoomer-pic-wp .picZoomer-pic").elevateZoom({
            zoomType: "window",
            cursor: "crosshair",
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750
        })) : (a = $(this).attr("data-videosrc"), $("#videoFrame").show(), $("#videoFrame").attr("src", a), $("#videoModal #videoFrame").attr("src", a), $("#videoModal").modal(), $("#videoModal").addClass("active"))
});

function openPop(a) {
    $("loggedIn").val();
    $("#addedMessage").hide();
    ussidValue = null == a || "" == a ? $("#ussid").val() : a;
    var b = $("#product").val();
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/p/viewWishlistsInPDP",
        data: "productCode=" + b + "&ussid=" + ussidValue,
        dataType: "json",
        success: function(a) {
            null == a ? ($("#wishListNonLoggedInId").show(), $("#wishListDetailsId").hide()) : "" == a || a == [] ? loadDefaultWishListName() : LoadWishLists(ussidValue, a, b)
        },
        error: function(a, b, e) {
            $("#wishListNonLoggedInId").show();
            $("#wishListDetailsId").hide()
        }
    })
}

function loadDefaultWishListName() {
    var a = "",
        b = $("#defaultWishId").text();
    $("#wishListNonLoggedInId").hide();
    $("#wishListDetailsId").show();
    a = a + "<tr><td><input type='text' id='defaultWishName'  value='" + b + "'/></td></td></tr>";
    $("#wishlistTbodyId").html(a)
}
$(document).on("keypress", "#defaultWishName", function(a) {
    var b = $("#defaultWishName").val(),
        c = a.keyCode;
    if (33 <= c && 48 > c || 58 <= c && 65 > c || 91 <= c && 97 > c) a.preventDefault(), a = this.selectionStart, c = this.selectionEnd, $("#defaultWishName").val(b), $("#addedMessage").show(), $("#addedMessage").html("<font color='#ff1c47'><b>Special characters are not allowed</b></font>"), $("#addedMessage").show().fadeOut(3E3), this.setSelectionRange(a, c)
});

function gotoLogin() {
    window.open(ACC.config.encodedContextPath + "/login", "_self")
}
var wishListList = [];

function LoadWishLists(a, b, c) {
    var d = c = "";
    $this = this;
    $("#wishListNonLoggedInId").hide();
    $("#wishListDetailsId").show();
    for (var e in b) {
        var k = !1,
            f = b[e],
            d = f.particularWishlistName;
        wishListList[e] = d;
        var f = f.ussidEntries,
            g;
        for (g in f)
            if (f[g] == a) {
                k = !0;
                break
            }
        c = k ? c + "<tr class='d0'><td ><input type='radio' name='wishlistradio' id='radio_" + e + "' style='display: none' onclick='selectWishlist(" + e + ")' disabled><label for='radio_" + e + "'>" + d + "</label></td></tr>" : c + "<tr><td><input type='radio' name='wishlistradio' id='radio_" +
            e + "' style='display: none' onclick='selectWishlist(" + e + ")'><label for='radio_" + e + "'>" + d + "</label></td></tr>"
    }
    $("#wishlistTbodyId").html(c)
}

function selectWishlist(a) {
    $("#hidWishlist").val(a)
}

function addToWishlist() {
    var a = $("#productCodePost").val(),
        b = "",
        b = "" == wishListList ? $("#defaultWishName").val().trim() : wishListList[$("#hidWishlist").val().trim()];
    if ("" == b || "" == b.trim()) return a = $("#wishlistnotblank").text(), $("#addedMessage").show(), $("#addedMessage").html(a), !1;
    if (void 0 == b || null == b) return !1;
    var c = ACC.config.encodedContextPath + "/p/addToWishListInPDP",
        d = !0;
    "#" == $("#variant,#sizevariant option:selected").val() && (d = !1);
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: c,
        data: "wish=" +
            b + "&product=" + a + "&ussid=" + ussidValue + "&sizeSelected=" + d,
        dataType: "json",
        success: function(a) {
            if (1 == a && ($("#radio_" + $("#hidWishlist").val()).prop("disabled", !0), a = $("#wishlistSuccess").text(), $("#addedMessage").show(), $("#addedMessage").html(a), setTimeout(function() {
                    $("#addedMessage").fadeOut().empty()
                }, 1500), populateMyWishlistFlyOut(b), a = $("input[name=isMSDEnabled]").val(), "true" === a)) {
                var c = $("input[name=isApparelExist]").val(),
                    d = $("input[name=salesHierarchyCategoryMSD]").val(),
                    g = $("input[name=rootCategoryMSD]").val(),
                    h = $("input[name=productCodeMSD]").val(),
                    l = $("input[id=price-for-mad]").val();
                "undefined" === typeof a && (a = !1);
                "undefined" === typeof c && (c = !1);
                Boolean(a) && Boolean(c) && "Clothing" === g && ACC.track.trackAddToWishListForMAD(h, d, l, "INR")
            }
        }
    });
    setTimeout(function() {
        $("a.wishlist#wishlist").popover("hide");
        $("input.wishlist#add_to_wishlist").popover("hide")
    }, 1500)
}

function populateMyWishlistFlyOut(a) {
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/my-account/wishlistAndItsItems",
        data: "wishlistName=" + a,
        dataType: "json",
        success: function(a) {
            $("#DropDownMyWishList").empty();
            for (var c in a) {
                var d = a[c].wishlistName,
                    e = a[c].wishlistSize,
                    k = a[c].wishlistUrl;
                $("#DropDownMyWishList").append('<li><a href="' + k + '">' + d + "<br><span>" + e + "&nbsp;items</span></a></li>")
            }
        }
    })
}

function showUrlInDialog(a) {
    var b = $("<div></div>");
    $.ajax({
        url: a,
        success: function(a) {
            b.html(a).dialog({
                modal: !0
            }).dialog("open")
        }
    })
}

function setValidPrice(a, b) {
    var c = Math.round(100 * a[b].spPrice) / 100;
    null != a[b].spPrice && 0 != a[b].spPrice ? (a[b].mopPrice == mrp ? ($("#mrpPriceId").append("<strike>" + mrp + "</strike>"), $("#mopPriceId").html("")) : ($("#mrpPriceId").append("<strike>" + mrp + "</strike>"), $("#mopPriceId").append("<strike>" + a[b].mopPrice + "</strike>")), $("#spPriceId").append(c)) : (null != a[b].mopPrice && 0 != a[b].mopPrice ? a[b].mopPrice == mrp ? ($("#mrpPriceId").append(mrp), $("#mopPriceId").html("")) : ($("#mrpPriceId").append("<strike>" + mrp +
        "</strike>"), $("#mopPriceId").append(a[b].mopPrice)) : ($("#mrpPriceId").append(mrp), $("#mopPriceId").html("")), $("#spPriceId").html(""));
    "" == mrp ? $("#mrpPriceId").hide() : $("#mrpPriceId").show()
}

function setSeller(a) {
    $("#inventory").hide();
    setValidPrice(sellersArray, a);
    $("#sellerNameId").html(sellersArray[a].sellername);
    $("#ussid").val(sellersArray[a].ussid);
    $("#stock").val(sellersArray[a].stock);
    populateSellers(a)
}

function refreshSellers(a, b) {
    for (var c = [], d = $("#isproductPage").val(), e = [], k = [], f = -1, g = -1, h = -1, l = 0, m = [], p = [], t = [], q = [], y = [], u = -1, A = -1, n = 0; n < a.length; n++)
        if (b != a[n].ussid)
            if ("Y" == a[n].isServicable) {
                "Y" == a[n].cod && (q[++A] = "'" + a[n].ussid + "'");
                e[n] = "'" + a[n].ussid + "'";
                l += 1;
                0 == a[n].stockCount && (k[++f] = "'" + a[n].ussid + "'");
                var r = a[n].validDeliveryModes,
                    z;
                for (z in r) {
                    var v = r[z].type;
                    "HD" == v && (p[++h] = "'" + a[n].ussid + "'");
                    "ED" == v && (m[++h] = "'" + a[n].ussid + "'");
                    "CNC" == v && (t[++h] = "'" + a[n].ussid + "'");
                    v = {};
                    v.ussid =
                        a[n].ussid;
                    v.stock = a[n].stockCount;
                    y[++u] = v;
                    $("#stockDataArray").val(JSON.stringify(y))
                }
            } else c[++g] = a[n].ussid;
    0 == l ? $("#otherSellerInfoId").hide() : ($("#otherSellerInfoId").show(), $("#otherSellersId").html(l));
    $("#otherSellersCount").html(l);
    e.join(",");
    k = k.join(",");
    $("#sellersSkuListId").val(c);
    $("#skuIdForED").val(m);
    $("#skuIdForHD").val(p);
    $("#skuIdForCNC").val(t);
    $("#skuIdForCod").val(q);
    $("#skuIdsWithNoStock").val(k);
    $("#isPinCodeChecked").val("true");
    $("#sellerListId").html("");
    "false" == d &&
        ($("#sellerTable").show(), $("#other-sellers-id").show(), 0 < l ? fetchAllSellers(y) : ($("#sellerTable").hide(), $("#other-sellers-id").hide()))
}

function populateSellers(a) {
    for (var b = "", c = 0; c < sellersArray.length; c++) c != a && (b += "<tr>", b += "<td> <a href='javascript: void(0)'\tonclick='setSeller(" + c + ")'>" + sellersArray[c].sellername + "</a></td>", b += "<td>" + sellersArray[c].ussid + "</td>", b += "<td>&nbsp;" + sellersArray[c].stock + "</td>", b += "</tr>");
    $("#sellerListId").html(b)
}

function isNum(a) {
    a = a ? a : window.event;
    var b = a.which ? a.which : a.keyCode;
    if (31 < b && (48 > b || 57 < b)) return !1;
    13 === a.keyCode && $(".submit").click();
    return !0
}
var pinCodeChecked = !1;
$(function() {
    var a = /^([1-9])([0-9]){5}$/;
    $("#codId").hide();
    $(".submit").click(function() {
        pinCodeChecked = !0;
        $("#home").hide();
        $("#homeli").hide();
        $("#express").hide();
        $("#expressli").hide();
        $("#collect").hide();
        $("#collectli").hide();
        $("#codId").hide();
        $("#wrongPin,#unableprocessPin,#unsevisablePin,#emptyPin").hide();
        $("#addToCartButton-wrong").attr("disable", !0);
        $("#addToCartButton-wrong").hide();
        $("#outOfStockId").hide();
        var b = !1,
            c = $("#ussid").val(),
            d = $("#pin").val(),
            e = ACC.config.encodedContextPath +
            "/p/checkPincode";
        if ("" == d) return $("#unsevisablePin,#unableprocessPin,#wrongPin").hide(), $("#emptyPin").show(), !1;
        if (!a.test(d)) return $("#unsevisablePin,#unableprocessPin,#emptyPin").hide(), $("#wrongPin").show(), !1;
        jQuery.ajax({
            contentType: "application/json; charset=utf-8",
            url: e,
            data: "pin=" + d + "&productCode=" + productCode,
            success: function(a) {
                if ("" == a || a == [] || null == a) return refreshSellers(a, c), $("#home").hide(), $("#homeli").hide(), $("#express").hide(), $("#expressli").hide(), $("#collect").hide(), $("#collectli").hide(),
                    $("#wrongPin,#unableprocessPin,#emptyPin").hide(), $("#addToCartFormTitle").hide(), $("#addToCartButton-wrong").show(), $("#addToCartButton").hide(), $("#unsevisablePin").show(), !1;
                if ("NA" == a[0].isServicable) return $("#home").show(), $("#homeli").show(), $("#express").show(), $("#expressli").show(), $("#collect").show(), $("#collectli").show(), $("#codId").show(), !1;
                refreshSellers(a, c);
                for (var d in a) {
                    var e = a[d];
                    ussid = e.ussid;
                    if (ussid == c)
                        if ("Y" == e.isServicable) {
                            b = !0;
                            deliveryModes = e.validDeliveryModes;
                            var h = !1,
                                l = !1,
                                m = !1;
                            0 == e.stockCount ? ($("#addToCartButton").hide(), $("#outOfStockId").show(), $("#stock").val(0)) : $("#addToCartButton").show();
                            "Y" == e.cod && $("#codId").show();
                            for (var p in deliveryModes) deliveryModeName = deliveryModes[p].type, $("#stock").val(e.stockCount), "HD" == deliveryModeName ? h = !0 : "CNC" == deliveryModeName ? m = !0 : l = !0;
                            1 == h ? ($("#home").show(), $("#homeli").show()) : ($("#home").hide(), $("#homeli").hide());
                            1 == l ? ($("#express").show(), $("#expressli").show()) : ($("#express").hide(), $("#expressli").hide());
                            1 == m ? ($("#collect").show(), $("#collectli").show()) : ($("#collect").hide(), $("#collectli").hide())
                        } else $("#home").hide(), $("#homeli").hide(), $("#click").hide(), $("#expressli").hide(), $("#express").hide(), $("#collectli").hide(), $("#wrongPin,#unableprocessPin,#emptyPin").hide(), $("#addToCartFormTitle").hide(), 0 < $("#stock").val() ? $("#addToCartButton-wrong").show() : $("#outOfStockId").show(), $("#addToCartButton").hide(), $("#unsevisablePin").show()
                }
                b || ($("#home").hide(), $("#homeli").hide(), $("#click").hide(),
                    $("#express").hide(), $("#expressli").hide(), $("#wrongPin,#unableprocessPin,#emptyPin").hide(), $("#addToCartFormTitle").hide(), 0 < $("#stock").val() ? $("#addToCartButton-wrong").show() : $("#outOfStockId").show(), $("#addToCartButton").hide(), $("#unsevisablePin").show());
                $("#pinCodeChecked").val(pinCodeChecked)
            },
            error: function(a, b, c) {
                $("#wrongPin,#unsevisablePin,#emptyPin").hide();
                $("#unableprocessPin").show()
            }
        })
    })
});

function fetchPrice() {
    $("#categoryType").val();
    $("#variant,#sizevariant option:selected").val();
    var a = $("#isproductPage").val();
    $("#addToCartButton").show();
    $("#outOfStockId").hide();
    var b = $("#product").val();
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/p/" + b + "/buybox",
        data: "productCode=" + b,
        dataType: "json",
        success: function(b) {
            if (void 0 != b.sellerArticleSKU) {
                if ("" != b.errMsg) return !1;
                var d = $("#promotedSellerId").val();
                null == d || void 0 == d || "" == d ? $("#promotionDetailsId").show() :
                    0 < d.length && -1 != d.indexOf(b.sellerId) && $("#promotionDetailsId").show();
                var e = b.allOOStock,
                    d = b.sellerName,
                    k = b.sellerId;
                $("#sellerNameId").html(d);
                $("#sellerSelId").val(k);
                "Y" == e && 0 < b.othersSellersCount ? ($("#addToCartButton").hide(), $("#outOfStockId").show(), $("#otherSellerInfoId").hide(), $("#otherSellerLinkId").show()) : "Y" == e && 0 == b.othersSellersCount ? ($("#addToCartButton").hide(), $("#outOfStockId").show(), $("#otherSellerInfoId").hide(), $("#otherSellerLinkId").hide()) : 0 == b.othersSellersCount ? ($("#otherSellerInfoId").hide(),
                    $("#otherSellerLinkId").hide()) : -1 == b.othersSellersCount ? ($("#otherSellerInfoId").hide(), $("#otherSellerLinkId").show()) : ($("#otherSellersId").html(b.othersSellersCount), $("#minPriceId").html(b.minPrice.formattedValue));
                $("#ussid").val(b.sellerArticleSKU);
                $("#sellerSkuId").val(b.sellerArticleSKU);
                var e = b.specialPrice,
                    k = b.mrp,
                    f = b.price;
                $("#stock").val(b.availablestock);
                $(".selectQty").change(function() {
                    $("#qty").val($(".selectQty :selected").val())
                });
                displayDeliveryDetails(d);
                dispPrice(k, f, e);
                "false" ==
                a && (fetchAllSellers(), $("#minPrice").html(b.minPrice.formattedValue))
            } else $("#addToCartButton-wrong").attr("disable", !0), $("#addToCartButton-wrong").show(), $("#addToCartButton").hide(), $("#otherSellerInfoId").hide(), $(".wish-share").hide(), $(".fullfilled-by").hide(), $("#dListedErrorMsg").show(), $("#pdpPincodeCheck").hide(), $("#pin").attr("disabled", !0), $("#pdpPincodeCheckDList").show()
        }
    })
}

function displayDeliveryDetails(a) {
    var b = $("#ussid").val(),
        c = $("#product").val();
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/p/" + c + "/getRichAttributes",
        data: "buyboxid=" + b,
        dataType: "json",
        success: function(b) {
            if (null != b) {
                var c = $("#deliveryPretext").text(),
                    k = $("#deliveryPosttext").text(),
                    f = b.fulfillment,
                    g = b.deliveryModes,
                    h = 0;
                null != b.leadTimeForHomeDelivery && (h = b.leadTimeForHomeDelivery);
                null != b.newProduct && "y" == b.newProduct.toLowerCase() && ($("#newProduct").show(),
                    $(".picZoomer-pic-wp #codId").css("top", "85px"));
                b.onlineExclusive && $(".online-exclusive").show();
                "tship" == f.toLowerCase() ? $("#fulFilledByTship").show() : ($("#fulFilledBySship").show(), $("#fulFilledBySship").html(a)); - 1 == g.indexOf("HD") ? ($("#home").hide(), $("#homeli").hide()) : (f = parseInt($("#homeStartId").val()) + h, h = parseInt($("#homeEndId").val()) + h, $("#homeDate").html(c + f + "-" + h + k), $("#home").show(), $("#homeli").show()); - 1 == g.indexOf("ED") ? ($("#express").hide(), $("#expressli").hide()) : (f = $("#expressStartId").val(),
                    h = $("#expressEndId").val(), $("#expressDate").html(c + f + "-" + h + k), $("#express").show(), $("#expressli").show());
                console.log(g.indexOf("CNC")); - 1 == g.indexOf("CNC") ? ($("#collect").hide(), $("#collectli").hide()) : (f = $("#clickStartId").val(), h = $("#clickEndId").val(), $("#clickDate").html(c + f + "-" + h + k), $("#collect").show(), $("#collectli").show());
                "Y" == b.isCod ? $("#codId").show() : $("#codId").hide();
                null != b.returnWindow ? $("#returnWindow").text(b.returnWindow) : $("#returnWindow").text("0")
            }
        }
    })
}

function dispPrice(a, b, c) {
    null != a && $("#mrpPriceId").append(a.formattedValue);
    null != b && $("#mopPriceId").append(b.formattedValue);
    null != c && $("#spPriceId").append(c.formattedValue);
    null != c && 0 != c ? ($("#mrpPriceId").css("text-decoration", "line-through"), $("#mrpPriceId").show(), $("#spPriceId").show()) : null != b && 0 != b.value ? b.value == a.value ? ($("#mrpPriceId").removeClass("old").addClass("sale"), $("#mrpPriceId").show()) : ($("#mrpPriceId").css("text-decoration", "line-through"), $("#mrpPriceId").show(), $("#mopPriceId").show()) :
        $("#mrpPriceId").show();
    "" == a.value ? $("#mrpPriceId").hide() : $("#mrpPriceId").show();
    void 0 != c || null != c ? ($("#prodPrice").val(c.value), $("#price-for-mad").val(c.value)) : void 0 != b || null != b ? ($("#prodPrice").val(b.value), $("#price-for-mad").val(b.value)) : ($("#prodPrice").val(a.value), $("#price-for-mad").val(a.value));
    parseInt($("#prodPrice").val()) > emiCuttOffAmount.value && $("#emiStickerId").show()
}

function openPopForBankEMI() {
    var a = $("#prodPrice").val(),
        b = "<option value='select' disabled selected>Select</option>";
    $("#emiTableTHead").hide();
    $("#emiTableTbody").hide();
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/p/enlistEMIBanks",
        data: "productVal=" + a,
        dataType: "json",
        success: function(a) {
            for (var d = 0; d < a.length; d++) b += "<option value='" + a[d] + "'>" + a[d] + "</option>";
            $("#bankNameForEMI").html(b)
        },
        error: function(a, b, e) {}
    })
}

function getSelectedEMIBankForPDP() {
    var a = $("#prodPrice").val(),
        b = $("#bankNameForEMI :selected").text(),
        c = "";
    "select" != b && $.ajax({
        url: ACC.config.encodedContextPath + "/p/getTerms",
        data: {
            selectedEMIBank: b,
            productVal: a
        },
        type: "GET",
        cache: !1,
        success: function(a) {
            if (null != a) {
                $("#emiTableTHead").show();
                $("#emiTableTbody").show();
                for (var b = 0; b < a.length; b++) c += "<tr>", c += "<td>" + a[b].term + "</td>", c += "<td>" + a[b].interestRate + "</td>", c += "<td>" + a[b].monthlyInstallment + "</td>", c += "<td>" + a[b].interestPayable + "</td>",
                    c += "</tr>";
                $("#emiTableTbody").html(c)
            } else $("#emiNoData").show()
        },
        error: function(a) {
            $("#emiSelectBank").show()
        }
    })
}

function CheckonReload() {
    $.ajax({
        url: ACC.config.encodedContextPath + "/p/checkUser",
        data: {},
        type: "GET",
        cache: !1,
        success: function(a) {
            a ? $("#commentsDiv .gig-comments-composebox").show() : $("#commentsDiv .gig-comments-composebox").hide()
        },
        error: function(a) {
            console.log("Error Occured")
        }
    })
}

function getRating(a, b, c) {
    $.getJSON("https://comments.us1.gigya.com/comments.getStreamInfo?apiKey=" + a + "&categoryID=" + c + "&streamId=" + b + "&includeRatingDetails=true&format=jsonp&callback=?", function(a) {
        console.log(a);
        var b = a.streamInfo.ratingCount,
            c = a.streamInfo.ratingDetails._overall.ratings,
            c = c.reverse();
        $("div.rate-details div.after").each(function(a) {
            var d = c[a];
            $("div.rate-bar div.rating").eq(a).css({
                width: d / b * 100 + "%"
            });
            $("div.rate-details div.after").eq(a).text(c[a])
        });
        var f = a.streamInfo.avgRatings._overall,
            g = a.streamInfo.ratingCount;
        $(".product-detail ul.star-review a").empty();
        $(".product-detail ul.star-review li").attr("class", "empty");
        for (var h = Math.floor(f), f = f - h, l = 0; l < h; l++) $("#pdp_rating li").eq(l).removeClass("empty").addClass("full");
        0 != f && $("#pdp_rating li").eq(h).removeClass("empty").addClass("half");
        1 == g ? ($(".gig-rating-readReviewsLink_pdp").text(g + " REVIEW"), $("#ratingDiv .gig-rating-readReviewsLink").text(a.streamInfo.ratingCount + " REVIEW")) : 0 < g && ($(".gig-rating-readReviewsLink_pdp").text(g +
            " REVIEWS"), $("#ratingDiv .gig-rating-readReviewsLink").text(a.streamInfo.ratingCount + " REVIEWS"));
        $("#customer").text("Customer Reviews (" + a.streamInfo.ratingCount + ")")
    });
    gigya.comments.showRatingUI({
        categoryID: c,
        streamID: b,
        containerID: "ratingDiv",
        linkedCommentsUI: "commentsDiv",
        showCommentButton: "true",
        onAddReviewClicked: function(a) {
            CheckUserLogedIn()
        }
    })
}

function CheckUserLogedIn() {
    $.ajax({
        url: ACC.config.encodedContextPath + "/p/checkUser",
        data: {},
        type: "GET",
        cache: !1,
        success: function(a) {
            a || gotoLogin()
        },
        error: function(a) {
            console.log("Error Occured")
        }
    })
}

function nextImage() {
    var a = $(".product-info .imageListCarousel li").height(),
        b = $(".product-info .imageListCarousel li").length / 2;
    parseInt($(".product-info .imageListCarousel").css("top")) % a || (parseInt($(".product-info .imageListCarousel").css("top")) > -a * (b - imagePageLimit) ? ($(".product-info .imageListCarousel").animate({
        top: "-=" + a + "px"
    }, "250"), $("#previousImage,#zoomModal #previousImage").css("opacity", "1")) : $("#nextImage,#zoomModal #nextImage").css("opacity", "0.5"));
    parseInt($(".product-info .imageListCarousel").css("top")) ==
        (b - imagePageLimit - 1) * -a && $("#nextImage,#zoomModal #nextImage").css("opacity", "0.5")
}

function previousImage() {
    var a = $(".product-info .imageListCarousel li").height();
    parseInt($(".product-info .imageListCarousel").css("top")) % a || (0 > parseInt($(".product-info .imageListCarousel").css("top")) ? ($("#nextImage,#zoomModal #nextImage").css("opacity", "1"), $(".product-info .imageListCarousel").animate({
        top: "+=" + a + "px"
    }, "250")) : $("#previousImage,#zoomModal #previousImage").css("opacity", "0.5"));
    parseInt($(".product-info .imageListCarousel").css("top")) == -a && $("#previousImage,#zoomModal #previousImage").css("opacity",
        "0.5")
}
$(".showDate").click(function() {
    $(".show-date").toggle()
});

function sendmail() {
    $("#emailSuccess,#emailUnSuccess,#emailError,#validateemail,#emailEmpty").hide();
    var a = $("#emailId").val(),
        b = $("#pId").val(),
        b = "emailList=" + a + "&productId=" + b;
    if ("" != a)
        if (validEmail(a)) $.ajax({
            url: ACC.config.encodedContextPath + "/p/sendEmail",
            data: b,
            type: "GET",
            cache: !1,
            success: function(a) {
                if (1 == a) $("#emailUnSuccess,#emailError,#validateemail,#emailEmpty").hide(), $("#emailSuccess").show();
                else return $("#emailSuccess,#emailError,#validateemail,#emailEmpty").hide(), $("#emailUnSuccess").show(), !1
            },
            error: function(a) {
                $("#emailSuccess,#emailUnSuccess,#validateemail,#emailEmpty").hide();
                $("#emailError").show();
                return !1
            }
        });
        else return $("#emailSuccess,#emailUnSuccess,#emailError,#emailEmpty").hide(), $("#validateemail").show(), !1;
    else return $("#emailSuccess,#emailUnSuccess,#emailError,#validateemail").hide(), $("#emailEmpty").show(), !1
}

function validEmail(a) {
    a = a.split(",");
    for (var b = 0; b < a.length; b++)
        if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(a[b])) return !1;
    return !0
}

function dispPriceForSizeGuide(a, b, c) {
    null != a && $("#sizemrpPriceId").append(a);
    null != b && $("#sizemopPriceId").append(b);
    null != c && $("#sizespPriceId").append(c);
    null != c && 0 != c ? ($("#sizemrpPriceId").css("text-decoration", "line-through"), $("#sizemrpPriceId").show(), $("#sizespPriceId").show()) : null != b && 0 != b ? b == a ? ($("#sizemrpPriceId").removeClass("old").addClass("sale"), $("#sizemrpPriceId").show()) : ($("#sizemrpPriceId").css("text-decoration", "line-through"), $("#sizemrpPriceId").show(), $("#sizemopPriceId").show()) :
        $("#sizemrpPriceId").show();
    "" == a ? $("#sizemrpPriceId").hide() : $("#sizemrpPriceId").show()
}

function buyboxDetailsForSizeGuide(a) {
    var b = $("#sellerSelId").val();
    console.log(b + " " + a);
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/p/buyboxDataForSizeGuide",
        data: "productCode=" + a + "&sellerId=" + b,
        dataType: "json",
        success: function(a) {
            var b = a.sellerName,
                e = a.sellerId,
                k = a.price,
                f = a.mrp,
                g = a.specialPrice,
                h = a.availablestock,
                l = a.sellerArticleSKU;
            a = a.noseller;
            if ("undefined" == b || null == b || "" == b) $("#productDetails").hide(), $("#sizePrice").hide(), $("#addToCartSizeGuide").hide(),
                $("#noProductForSelectedSeller").show(), $("#addToCartSizeGuide #addToCartButton").attr("style", "display:none");
            null != g ? $("#specialSelPrice").html(g) : $("#specialSelPrice").html(k);
            $("#sellerSelName").html(b);
            $("#sellerIdSizeGuide").html(e);
            $("#mopSelPrice").html(k);
            $("#mrpSelPrice").html(f);
            $("#sizeStock").val(h);
            $("#sellerSelArticleSKU").html(l);
            $("#sellerSelArticleSKUVal").val(l);
            $("#nosellerVal").val(a);
            dispPriceForSizeGuide(f, k, g);
            0 == h ? ($("#outOfStockText").html("<font color='#ff1c47'>" + $("#outOfStockText").text() +
                "</font>"), $("#addToCartSizeGuideTitleoutOfStockId").show(), $("#addToCartSizeGuide #addToCartButton").attr("style", "display:none")) : $("#addToCartSizeGuide #addToCartButton").removeAttr("style")
        }
    })
}

function openPop_SizeGuide() {
    $("loggedIn").val();
    $("#addedMessage_sizeGuide").hide();
    ussidValue = $("#sellerSelArticleSKUVal").val();
    var a = $("#productCode").val();
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: ACC.config.encodedContextPath + "/p/viewWishlistsInPDP",
        data: "productCode=" + a + "&ussid=" + ussidValue,
        dataType: "json",
        success: function(b) {
            null == b ? ($("#wishListNonLoggedInId_sizeGuide").show(), $("#wishListDetailsId_sizeGuide").hide()) : "" == b || b == [] ? loadDefaultWishListName_SizeGuide() : LoadWishLists_SizeGuide(ussidValue,
                b, a)
        },
        error: function(a, c, d) {
            $("#wishListNonLoggedInId_sizeGuide").show();
            $("#wishListDetailsId_sizeGuide").hide()
        }
    })
}

function LoadWishLists_SizeGuide(a, b, c) {
    var d = c = "";
    $this = this;
    $("#wishListNonLoggedInId_sizeGuide").hide();
    $("#wishListDetailsId_sizeGuide").show();
    for (var e in b) {
        var k = !1,
            f = b[e],
            d = f.particularWishlistName;
        wishListList[e] = d;
        var f = f.ussidEntries,
            g;
        for (g in f)
            if (f[g] == a) {
                k = !0;
                break
            }
        c = k ? c + "<tr class='d0'><td ><input type='radio' name='wishlistradio' id='radio_" + e + "' style='display: none' onclick='selectWishlist_SizeGuide(" + e + ")' disabled><label for='radio_" + e + "'>" + d + "</label></td></tr>" : c + "<tr><td><input type='radio' name='wishlistradio' id='radio_" +
            e + "' style='display: none' onclick='selectWishlist_SizeGuide(" + e + ")'><label for='radio_" + e + "'>" + d + "</label></td></tr>"
    }
    $("#wishlistTbodyId_sizeGuide").html(c)
}

function loadDefaultWishListName_SizeGuide() {
    var a = "",
        b = $("#defaultWishId_sizeGuide").text();
    $("#wishListNonLoggedInId_sizeGuide").hide();
    $("#wishListDetailsId_sizeGuide").show();
    a = a + "<tr><td><input type='text' id='defaultWishName_sizeGuide' value='" + b + "'/></td></td></tr>";
    $("#wishlistTbodyId_sizeGuide").html(a)
}

function selectWishlist_SizeGuide(a) {
    $("#hidWishlist_sizeGuide").val(a)
}

function addToWishlist_SizeGuide() {
    var a = $("#productCode").val(),
        b = "",
        b = "" == wishListList ? $("#defaultWishName_sizeGuide").val() : wishListList[$("#hidWishlist_sizeGuide").val()];
    if ("" == b) return a = $("#wishlistnotblank_sizeGuide").text(), $("#addedMessage_sizeGuide").show(), $("#addedMessage_sizeGuide").html(a), !1;
    if (void 0 == b || null == b) return !1;
    var c = ACC.config.encodedContextPath + "/p/addToWishListInPDP",
        d = !0;
    "#" == $("#variant.size-g option:selected").val() && (d = !1);
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: c,
        data: "wish=" + b + "&product=" + a + "&ussid=" + ussidValue + "&sizeSelected=" + d,
        dataType: "json",
        success: function(a) {
            if (1 == a && ($("#radio_" + $("#hidWishlist_sizeGuide").val()).prop("disabled", !0), a = $("#wishlistSuccess_sizeGuide").text(), $("#addedMessage_sizeGuide").show(), $("#addedMessage_sizeGuide").html(a), setTimeout(function() {
                    $("#addedMessage_sizeGuide").fadeOut().empty()
                }, 1500), populateMyWishlistFlyOut(b), a = $("input[name=isMSDEnabled]").val(), "true" === a)) {
                console.log(a);
                var c = $("input[name=isApparelExist]").val();
                console.log(c);
                var d = $("input[name=salesHierarchyCategoryMSD]").val();
                console.log(d);
                var g = $("input[name=rootCategoryMSD]").val();
                console.log(g);
                var h = $("input[name=productCodeMSD]").val();
                console.log(h);
                var l = $("input[id=price-for-mad]").val();
                console.log(l);
                "undefined" === typeof a && (a = !1);
                "undefined" === typeof c && (c = !1);
                Boolean(a) && Boolean(c) && "Clothing" === g && ACC.track.trackAddToWishListForMAD(h, d, l, "INR")
            }
        }
    });
    setTimeout(function() {
            $("a.wishlist#wishlist").popover("hide");
            $("input.wishlist#add_to_wishlist-sizeguide").popover("hide")
        },
        1500)
};
ACC.checkoutsteps = {
    _autoload: ["permeateLinks"],
    permeateLinks: function() {
        $(document).on("click", ".js-checkout-step", function(a) {
            a.preventDefault();
            window.location = $(this).closest("a").attr("href")
        })
    }
};
ACC.navigation = {
    _autoload: ["offcanvasNavigation"],
    offcanvasNavigation: function() {
        enquire.register("screen and (max-width:" + screenSmMax + ")", {
            match: function() {
                $(document).on("click", ".js-enquire-offcanvas-navigation .js-enquire-has-sub > a", function(a) {
                    a.preventDefault();
                    $(".js-enquire-offcanvas-navigation > ul").addClass("active");
                    $(".js-enquire-offcanvas-navigation .js-enquire-has-sub").removeClass("active");
                    $(this).parent(".js-enquire-has-sub").addClass("active")
                });
                $(document).on("click", ".js-enquire-offcanvas-navigation .js-enquire-sub-close",
                    function(a) {
                        a.preventDefault();
                        $(".js-enquire-offcanvas-navigation > ul").removeClass("active");
                        $(".js-enquire-offcanvas-navigation .js-enquire-has-sub").removeClass("active")
                    })
            },
            unmatch: function() {
                $(".js-enquire-offcanvas-navigation > ul").removeClass("active");
                $(".js-enquire-offcanvas-navigation .js-enquire-has-sub").removeClass("active");
                $(document).off("click", ".js-enquire-offcanvas-navigation .js-enquire-has-sub > a");
                $(document).off("click", ".js-enquire-offcanvas-navigation .js-enquire-sub-close")
            }
        })
    }
};
ACC.quickview = {
    _autoload: ["bindToUiCarouselLink"],
    initQuickviewLightbox: function() {
        ACC.product.enableAddToCartButton();
        ACC.product.addToBag();
        ACC.product.enableStorePickupButton()
    },
    refreshScreenReaderBuffer: function() {
        $("#accesibility_refreshScreenReaderBufferField").attr("value", (new Date).getTime())
    },
    bindToUiCarouselLink: function() {
        var a = $("#quickViewTitle").html();
        $(".js-reference-item,.comparison-table .product-tile").colorbox({
            close: '<span class="glyphicon glyphicon-remove"></span>',
            title: a,
            maxWidth: "100%",
            onComplete: function() {
                quickviewGallery();
                ACC.quickview.refreshScreenReaderBuffer();
                ACC.quickview.initQuickviewLightbox();
                ACC.ratingstars.bindRatingStars($(".quick-view-stars"))
            },
            onClosed: function() {
                ACC.quickview.refreshScreenReaderBuffer();
                window.top == window && $("body").hasClass("page-cartPage") && window.setTimeout("location.reload()")
            }
        })
    }
};

function quickviewGallery() {
    $(document).ready(function() {
        var a = $(".main-image").find("img.picZoomer-pic").height() / 5;
        $(".imageList ul li img").css("height", a);
        $("#previousImage").css("opacity", "0.5");
        $("#nextImage").css("opacity", "1");
        a = $(".imageList li").height();
        $("#previousImage").length && ($(".imageList").css("height", a * imagePageLimit + "px"), $(".productImageGallery").css("height", a * imagePageLimit + 100 + "px"));
        $(".imageListCarousel").show();
        "ontouchstart" in window && ($(".quick-view-popup #variantForm .select-size span.selected").next("ul").hide(),
            $(".quick-view-popup #variantForm .select-size span.selected").click(function() {
                $(this).next("ul").toggleClass("select_height_toggle")
            }))
    })
};