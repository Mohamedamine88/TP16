// Types Enum simulés en JS
export const TypeCompte = {
  COURANT: "COURANT",
  EPARGNE: "EPARGNE",
};

export const TypeTransaction = {
  DEPOT: "DEPOT",
  RETRAIT: "RETRAIT",
};

// Modèles JS (optionnel : juste pour organisation)
export class Compte {
  constructor(id, solde, dateCreation, type) {
    this.id = id;
    this.solde = solde;
    this.dateCreation = dateCreation;
    this.type = type;
  }
}

export class Transaction {
  constructor(id, type, montant, date, compte) {
    this.id = id;
    this.type = type;
    this.montant = montant;
    this.date = date;
    this.compte = compte;
  }
}

export class SoldeStats {
  constructor(count, sum, average) {
    this.count = count;
    this.sum = sum;
    this.average = average;
  }
}

export class TransactionStats {
  constructor(count, sumDepots, sumRetraits) {
    this.count = count;
    this.sumDepots = sumDepots;
    this.sumRetraits = sumRetraits;
  }
}

export class CompteRequest {
  constructor(solde, type) {
    this.solde = solde;
    this.type = type;
  }
}

export class TransactionRequest {
  constructor(type, montant, compteId) {
    this.type = type;
    this.montant = montant;
    this.compteId = compteId;
  }
}
