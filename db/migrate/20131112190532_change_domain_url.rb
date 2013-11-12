class ChangeDomainUrl < ActiveRecord::Migration
  def change
    remove_column :domains, :domain_url
    add_column :domains, :domain_url, :bytea
  end
end
