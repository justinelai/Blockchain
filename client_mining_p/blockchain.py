import hashlib
import json
from time import time
from uuid import uuid4
from flask import Flask, jsonify, request
class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash
        }
        self.current_transactions = []
        self.chain.append(block)
        return block

    def hash(self, block):
        string_object = json.dumps(block, sort_keys=True).encode()
        raw_hash = hashlib.sha256(string_object)
        hex_hash = raw_hash.hexdigest()
        return hex_hash
    
    @property
    def last_block(self):
        return self.chain[-1]
    
    @staticmethod
    def valid_proof(block_string, proof):
        guess = f"{block_string}{proof}".encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:6] == "000000"

    
app = Flask(__name__)
node_identifier = str(uuid4()).replace('-', '')
blockchain = Blockchain()

@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        # TODO: Return the chain and its current length
        'length': len(blockchain.chain),
        'chain': blockchain.chain
    }
    return jsonify(response), 200

@app.route('/last_block', methods=['GET'])
def return_last():
    response = {
        'last_block': blockchain.last_block
    }
    return jsonify(response), 200

@app.route('/mine', methods=['POST'])
def mine():
    # pull out request data
    data = request.get_json()
   
    # check for required fields proof and id
    required = ['proof', 'id']
    if not all(r in data for r in required):
        response = {
        'message': 'Missing required fields'
        }
        return jsonify(response), 400

    #  validate proof
    last_string = json.dumps(blockchain.last_block, sort_keys=True)
    valid = blockchain.valid_proof(last_string, data['proof'])
    if valid:

        # forge the new block
        previous_hash = blockchain.hash(blockchain.last_block)
        block = blockchain.new_block(data['proof'], previous_hash)
        response = {
            'message': 'New Block Forged',
            'block': block
        }
        return jsonify(response), 200
    else: 
        response = {
            'message': 'Invalid proof!',
        }
        return jsonify(response), 200

# Run the program on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

