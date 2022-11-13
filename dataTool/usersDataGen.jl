using JSON3

function usersDataGen(userNum::Int)
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
    for i = 1:userNum
        nickName = String(UInt8.(rand(97:122, 5)))
        user = Dict([
            ("id", i)
            ("nickName", nickName)
            ("userName", nickName)
            ("role", getRole(rand(1:2)))
        ])
        push!(users, user)
    end
    products["data"]["data"] = users
    JSON3.write(joinpath(@__DIR__, "usersData.json"), products)
end


# 生成任意数量的用户，函数参数为用户个数
usersDataGen(100)