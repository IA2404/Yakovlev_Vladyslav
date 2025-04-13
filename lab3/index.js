let validRarities = ["common", "uncommon", "rare", "legendary"]

class Item {
    constructor(_name, _weight, _rarity) {
        this.name = _name;
        this.weight = _weight;
        if (!validRarities.includes(_rarity)) {
            throw new Error(`Invalid Rarity: ${_rarity}`);
        }
        this.rarity = _rarity;

    }
    #name;
    weight;
    rarity;
    getInfo() {
        console.log(this.name);
    }
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

const sword = new Item("Steel Sword", 3.5, "rare");
sword.getInfo()
sword.setWeight(4.0);
console.log(sword.weight);

class Weapon extends Item {
    constructor(_name, _weight, _rarity, _damage, _durability) {
        super(_name, _weight, _rarity);
        if (_damage < 0) {
            throw new Error(`Invalid Damage: ${_damage}`);
        } else {
            this.damage = _damage;
        }
        if (_durability < 0) {
            throw new Error(`Invalid Durability: ${_durability}`);
        } else {
            this.durability = _durability;
        }
    }

    damage;
    durability;

    use() {
        if (this.durability > 0) {
            this.durability -= 10;
        }
        else {
            console.log("Weapon is broken");
        }
    }
    repair() {
        this.durability = 100;
    }
}

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
bow.getInfo();
bow.use();
console.log(bow?.durability);
console.log(bow?.testField);
bow.repair();