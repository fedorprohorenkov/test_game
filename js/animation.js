$(function(){
    var timerId
    var time

    $("#start").click(function(){
        timerId =setInterval(function(){
           time += 1
            console.log("Timer: " + time)
            var sec = time%60
            var min = parseInt(time/60)
            $("span").html(min+":"+sec)
        },1000)
        $(this).attr("disabled","disabled")
        game()
    })
    $("#stop").click(function(){
        $("td").off("click")
        $("td").css("background","lightgray")
        $("#start").attr("disabled",false)
        window.clearInterval(timerId);
        $("p").html("")

    })





    function game() {
        $("td").css("background","lightgray")
        $("p").html("")
        var colors = ["red", "red", "blue", "blue", "green", "green", "yellow", "yellow", "#d513ec", "#d513ec", "#f07613", "#f07613", "#50d5f6", "#50d5f6", "#6de268", "#6de268"]
        var shuffled = colors.shuffle()
        var score = 0
        time = 0

        $("td").each(function (index) {
            console.log(index)
            $(this).attr("data-color", shuffled[index])
            $(this).data("color",shuffled[index])
            $(this).attr("data-index", index)
        })

        var first = 0
        var second = 0
        var first_square,
                second_square

        $("td").click(function () {

            if ($(this).data("color")) {


                if (first && !second) {
                    second_square = $(this)
                    if(first_square.data("index") != second_square.data("index")) {
                        console.log("Второй клик")
                        second = 1
                        $(this).css("background", $(this).data("color"))
                    }

                }
                if (!first) {
                    console.log("Первый клик")
                    first = 1
                    $(this).css("background", $(this).data("color"))
                    first_square = $(this)
                }
                if (first && second) {
                    console.log("Начинаем сравнивать")
                    var color_first_square = first_square.data("color")
                    var color_second_square = second_square.data("color")
                    console.log(color_first_square)
                    console.log(color_second_square)
                    if (color_first_square == color_second_square) {
                        console.log("Цвет совпал")
                        first_square.data("color", "")
                        second_square.data("color", "")
                        first = 0
                        second = 0
                        score++
                        if(score == 8){
                            $("p").html("Игра закончена, вы победили !!!")
                            window.clearInterval(timerId);
                            $("#start").attr("disabled",false)
                        }

                    } else {
                        console.log("Цвет не совпал")
                        setTimeout(function () {
                            first_square.css("background", "lightgray")
                            second_square.css("background", "lightgray")
                            first = 0
                            second = 0
                        }, 600)


                    }

                }
            }

        })
    }


})
