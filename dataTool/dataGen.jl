using JSON3
products = Dict[]
for i = 1:50
    good = Dict([
        ("userId", 0)
        ("id", i)
        ("title", String(UInt8.(rand(97:122, 10))))
        ("introduce", String(UInt8.(rand(97:122, 100))))
    ])
    push!(products, good)
end
JSON3.write("goods.json",products)
