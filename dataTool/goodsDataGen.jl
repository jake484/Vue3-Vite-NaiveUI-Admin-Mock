using JSON3

function goodsDataGen(goodNum::Int)
    products = Dict(
        "data" => Dict(
            "code" => 200,
            "msg" => "获取成功",
            "success" => true,
            "token" => "admin_token"
        )
    )
    goods = Dict[]
    for i = 1:goodNum
        good = Dict([
            ("userId", 0)
            ("id", i)
            ("title", String(UInt8.(rand(97:122, 10))))
            ("introduce", String(UInt8.(rand(97:122, 100))))
        ])
        push!(goods, good)
    end
    products["data"]["data"] = goods
    JSON3.write(joinpath(@__DIR__, "goodsData.json"), products)
end

# 生成任意数量的商品，函数参数为商品个数
goodsDataGen(200)