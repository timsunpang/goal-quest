# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160304175205) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "goals", force: :cascade do |t|
    t.string   "title",                       null: false
    t.integer  "priority",    default: 3
    t.text     "description"
    t.integer  "user_id",                     null: false
    t.integer  "card_id",     default: 1,     null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "completed",   default: false, null: false
  end

  add_index "goals", ["user_id"], name: "index_goals_on_user_id", using: :btree

  create_table "items", force: :cascade do |t|
    t.string   "name",                    null: false
    t.text     "description",             null: false
    t.integer  "price",       default: 0
    t.integer  "hp_value",    default: 0
    t.integer  "atk_value",   default: 0
    t.integer  "def_value",   default: 0
    t.string   "item_type",               null: false
    t.string   "picture_url"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "special",     default: 0, null: false
    t.string   "armor_type"
  end

  create_table "ownerships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "item_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "ownerships", ["item_id"], name: "index_ownerships_on_item_id", using: :btree
  add_index "ownerships", ["user_id"], name: "index_ownerships_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                      null: false
    t.string   "password_digest",               null: false
    t.string   "session_token",                 null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "level",           default: 1,   null: false
    t.integer  "exp",             default: 0,   null: false
    t.integer  "gold",            default: 100, null: false
    t.integer  "face_id",         default: 100, null: false
    t.integer  "head_id",         default: 101, null: false
    t.integer  "body_id",         default: 102, null: false
    t.integer  "legs_id",         default: 103, null: false
    t.integer  "weapon_id",       default: 104, null: false
    t.integer  "shield_id",       default: 105, null: false
  end

end
