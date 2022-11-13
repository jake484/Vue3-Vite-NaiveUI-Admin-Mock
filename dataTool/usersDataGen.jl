using JSON3
products = Dict(
    "data" => Dict(
        "code" => 200,
        "msg" => "获取成功",
        "success" => true,
        "token" => "admin_token"
    )
)

function getRole(num::Int)
    if num == 1
        return [
            Dict([
                ("role", 1)
                ("roleName", "管理员")
            ]),
            Dict([
                ("role", 2)
                ("roleName", "普通用户")
            ])
        ]
    elseif num == 2
        return [
            Dict([
                ("role", 2)
                ("roleName", "普通用户")
            ])
        ]
    else 
        return [
            Dict([
                ("role", 1)
                ("roleName", "管理员")
            ])
        ]
    end
end

users = Dict[]
for i = 1:20
    nickName = String(UInt8.(rand(97:122, 5)))
    user = Dict([
        ("id", i)
        ("nickName", nickName)
        ("userName", nickName)
        ("role", getRole(rand(1:3)))
    ])
    push!(users, user)
end
products["data"]["data"] = users
JSON3.write(joinpath(@__DIR__, "usersData.json"), products)
