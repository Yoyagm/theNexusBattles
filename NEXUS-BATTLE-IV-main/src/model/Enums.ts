export enum HeroType {
    TANK,
    WEAPONS_PAL,
    FIRE_MAGE,
    ICE_MAGE,
    POISON_ROGUE,
    SHAMAN,
    MEDIC
}

export enum HeroState {
    ALIVE,
    DEAD
}

export enum EffectType {
    DAMAGE,
    HEAL,
    BOOST_ATTACK,
    BOOST_DEFENSE,
    REVIVE,
    DODGE,
    DEFENSE
}

export enum ArmorType {
    HELMET,
    CHEST,
    GLOVERS,
    BRACERS,
    BOOTS,
    PANTS
}

export enum ActionType {
    ATTACK,
    DEFENSE,
    HEAL
}

///////////////////battle room/////////////
export enum GameMode{
    COOP,
    PVP
}

export enum RoomState{
    CREATED,
    WAITING,
    IN_BATTLE,
    FINISHED
}

export enum BattleEventType {
    ATTACK,
    SPECIAL_ACTION,
    EPIC_ABILITY,
    DEATH,
    POWER_REGEN,
    DEFENSE
}