// 角色接口
export interface IRole {
    role: number,  // 角色id
    roleName: string  // 角色名称
}

// 有权限的角色接口
export interface IRoleWithAuth {
    roleName: string,
    roleId: number,
    authority: []
}

// 数据展示
export interface ShowRoleWithAuth extends IRoleWithAuth {
    key: number
}

// 展示角色数据
export class RolePages {
    role_list: IRoleWithAuth[] = []
    showrole_list: ShowRoleWithAuth[] = []
    addFormEidt: boolean = false
    addedName: string = ""
}